import { randomUUID } from "node:crypto";

/**
 * Guestbook API backed by Supabase (PostgREST + Storage over plain fetch).
 *
 * Needs two server-only env vars (never NEXT_PUBLIC_*):
 *   SUPABASE_URL               https://<project>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  service role key (bypasses RLS; server only)
 * Without them GET reports `enabled: false` and the UI shows "opens soon".
 * Table, bucket and policies: supabase/guestbook.sql. Setup: docs/guestbook-setup.md.
 */

const TABLE = "guestbook_entries";
const BUCKET = "guestbook-avatars";
const MAX_NAME = 40;
const MAX_MESSAGE = 500;
const MAX_PHOTO_BYTES = 1024 * 1024;
const LIST_LIMIT = 50;

type Entry = { id: string; name: string; message: string; avatar_url: string | null; created_at: string };

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

const authHeaders = (key: string) => ({ apikey: key, Authorization: `Bearer ${key}` });

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  const cfg = config();
  if (!cfg) return json({ enabled: false, entries: [], count: 0 });

  const query = `select=id,name,message,avatar_url,created_at&hidden=is.false&order=created_at.desc&limit=${LIST_LIMIT}`;
  const res = await fetch(`${cfg.url}/rest/v1/${TABLE}?${query}`, {
    headers: { ...authHeaders(cfg.key), Prefer: "count=exact" },
    cache: "no-store",
  });
  if (!res.ok) return json({ error: "Couldn’t load comments." }, 502);

  const entries = (await res.json()) as Entry[];
  // Content-Range: 0-49/87  →  87
  const total = Number(res.headers.get("content-range")?.split("/")[1]);
  return json({ enabled: true, entries, count: Number.isFinite(total) ? total : entries.length });
}

// Best-effort flood control: 3 posts per 10 minutes per IP, per server instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_POSTS = 3;
const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_POSTS) {
    recent.set(ip, hits);
    return true;
  }
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return false;
}

/** Collapse whitespace and drop control characters (keeps line breaks in comments). */
function clean(value: FormDataEntryValue | null, keepNewlines = false) {
  const text = typeof value === "string" ? value : "";
  const stripped = text.replace(keepNewlines ? /[^\P{Cc}\n]/gu : /\p{Cc}/gu, "");
  return (keepNewlines ? stripped.replace(/\n{3,}/g, "\n\n") : stripped.replace(/\s+/g, " ")).trim();
}

/** Identify the image from its first bytes rather than trusting the browser. */
function sniffImage(bytes: Uint8Array): { ext: string; type: string } | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { ext: "jpg", type: "image/jpeg" };
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return { ext: "png", type: "image/png" };
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return { ext: "webp", type: "image/webp" };
  return null;
}

export async function POST(request: Request) {
  const cfg = config();
  if (!cfg) return json({ error: "The guestbook isn’t open yet." }, 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return json({ error: "You’ve posted a few times already. Try again in a few minutes." }, 429);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: "Invalid form data." }, 400);
  }

  // Honeypot filled in: pretend it worked, store nothing.
  if (clean(form.get("website"))) return json({ entry: null }, 201);

  const name = clean(form.get("name"));
  const message = clean(form.get("message"), true);
  if (!name || name.length > MAX_NAME) return json({ error: `Name must be 1–${MAX_NAME} characters.` }, 400);
  if (!message || message.length > MAX_MESSAGE) return json({ error: `Comment must be 1–${MAX_MESSAGE} characters.` }, 400);

  let avatarUrl: string | null = null;
  const photo = form.get("photo");
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > MAX_PHOTO_BYTES) return json({ error: "Profile photo must be 1 MB or smaller." }, 400);
    const bytes = new Uint8Array(await photo.arrayBuffer());
    const kind = sniffImage(bytes);
    if (!kind) return json({ error: "Profile photo must be a JPG, PNG or WebP image." }, 400);

    const objectPath = `${new Date().toISOString().slice(0, 7)}/${randomUUID()}.${kind.ext}`;
    const upload = await fetch(`${cfg.url}/storage/v1/object/${BUCKET}/${objectPath}`, {
      method: "POST",
      headers: { ...authHeaders(cfg.key), "Content-Type": kind.type, "x-upsert": "false", "Cache-Control": "max-age=31536000" },
      body: bytes,
    });
    if (!upload.ok) return json({ error: "Couldn’t upload the photo. Try again without it." }, 502);
    avatarUrl = `${cfg.url}/storage/v1/object/public/${BUCKET}/${objectPath}`;
  }

  const insert = await fetch(`${cfg.url}/rest/v1/${TABLE}?select=id,name,message,avatar_url,created_at`, {
    method: "POST",
    headers: { ...authHeaders(cfg.key), "Content-Type": "application/json", Prefer: "return=representation" },
    body: JSON.stringify({ name, message, avatar_url: avatarUrl }),
  });
  if (!insert.ok) return json({ error: "Couldn’t post your comment. Please try again." }, 502);

  const [entry] = (await insert.json()) as Entry[];
  return json({ entry }, 201);
}
