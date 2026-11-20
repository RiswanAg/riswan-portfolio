"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, Loader2, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  avatar_url: string | null;
  created_at: string;
};

type Status = "loading" | "ready" | "off" | "error";

const MAX_NAME = 40;
const MAX_MESSAGE = 500;
const MAX_PHOTO_BYTES = 1024 * 1024;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** Visitor comments stored in Supabase through /api/guestbook. */
export function Guestbook() {
  const [status, setStatus] = useState<Status>("loading");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/guestbook")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { enabled: boolean; entries: GuestbookEntry[]; count: number }) => {
        if (cancelled) return;
        setEntries(data.entries);
        setCount(data.count);
        setStatus(data.enabled ? "ready" : "off");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, []);

  // Release the preview blob when it changes or the component unmounts.
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  function pickPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    if (file && !PHOTO_TYPES.includes(file.type)) {
      setFeedback({ tone: "error", text: "Use a JPG, PNG or WebP image." });
      event.target.value = "";
      return;
    }
    if (file && file.size > MAX_PHOTO_BYTES) {
      setFeedback({ tone: "error", text: "That photo is over 1 MB. Try a smaller one." });
      event.target.value = "";
      return;
    }
    setFeedback(null);
    setPhoto(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  function clearPhoto() {
    setPhoto(null);
    setPreview(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (photo) data.set("photo", photo);
    else data.delete("photo");
    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/guestbook", { method: "POST", body: data });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? "Couldn’t post your comment. Please try again.");
      if (body.entry) {
        setEntries((list) => [body.entry, ...list]);
        setCount((n) => n + 1);
      }
      form.reset();
      setMessage("");
      clearPhoto();
      setFeedback({ tone: "ok", text: "Thanks! Your comment is up." });
    } catch (error) {
      setFeedback({ tone: "error", text: error instanceof Error ? error.message : "Something went wrong." });
    } finally {
      setSending(false);
    }
  }

  const disabled = status !== "ready" || sending;
  const field =
    "w-full rounded-xl border border-line-2 bg-canvas px-3.5 py-3 text-sm text-ink placeholder:text-dim/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25 disabled:opacity-60";

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={submit} className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-7" aria-labelledby="guestbook-title">
        <h3 id="guestbook-title" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-ink">
          <MessageCircle size={20} className="text-accent" aria-hidden /> Write a comment
        </h3>
        <p className="mt-1 text-sm text-dim">Say hi, leave feedback, or tell me what you’re building.</p>

        {status === "off" && (
          <p className="mt-4 rounded-xl border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-ink">
            The guestbook opens soon. In the meantime, use the form or the links on this page.
          </p>
        )}

        <fieldset disabled={disabled} className="mt-5 space-y-4">
          {/* honeypot: hidden from people, bots fill it in */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-px w-px opacity-0" />
          <label className="block">
            <span className="text-xs font-semibold text-ink">Name</span>
            <input name="name" required maxLength={MAX_NAME} autoComplete="nickname" placeholder="Your name" className={cn(field, "mt-1.5")} />
          </label>
          <label className="block">
            <span className="flex justify-between text-xs font-semibold text-ink">
              Comment
              <span className="font-mono font-normal text-dim">
                {message.length}/{MAX_MESSAGE}
              </span>
            </span>
            <textarea
              name="message"
              required
              rows={3}
              maxLength={MAX_MESSAGE}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write your comment…"
              className={cn(field, "mt-1.5 resize-y")}
            />
          </label>

          <div>
            <span className="text-xs font-semibold text-ink">
              Profile photo <span className="font-normal text-dim">(optional, max 1 MB)</span>
            </span>
            <div className="mt-1.5 flex items-center gap-3">
              {preview ? (
                <span className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                  <img src={preview} alt="Selected profile photo" className="h-12 w-12 rounded-full object-cover" />
                  <button
                    type="button"
                    onClick={clearPhoto}
                    aria-label="Remove photo"
                    className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-ink text-canvas"
                  >
                    <X size={12} aria-hidden />
                  </button>
                </span>
              ) : null}
              <label className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-line-2 px-4 text-sm font-medium text-dim transition-colors hover:border-accent hover:text-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--focus)]">
                <ImagePlus size={16} aria-hidden />
                {photo ? "Change photo" : "Choose profile photo"}
                <input ref={fileInput} type="file" accept={PHOTO_TYPES.join(",")} onChange={pickPhoto} className="sr-only" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-on-accent shadow-[0_10px_30px_-12px_var(--accent)] transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:translate-y-0"
          >
            {sending ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
            {sending ? "Posting…" : "Post comment"}
          </button>
        </fieldset>
        <p aria-live="polite" className={cn("mt-3 min-h-5 text-xs", feedback?.tone === "error" ? "text-[#c2410c] dark:text-amber" : "text-dim")}>
          {feedback?.text}
        </p>
      </form>

      <section aria-labelledby="comments-title" className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-7">
        <h3 id="comments-title" className="flex items-center gap-2 text-lg font-bold text-ink">
          <MessageCircle size={18} className="text-accent" aria-hidden />
          Comments <span className="font-mono text-accent-strong">({count})</span>
        </h3>
        <div className="mt-4 max-h-[26rem] overflow-y-auto pr-1">
          {status === "loading" ? (
            <p className="flex items-center gap-2 py-6 text-sm text-dim">
              <Loader2 size={16} className="animate-spin" aria-hidden /> Loading comments…
            </p>
          ) : status === "error" ? (
            <p className="py-6 text-sm text-dim">Comments couldn’t be loaded right now.</p>
          ) : entries.length === 0 ? (
            <p className="py-6 text-sm text-dim">No comments yet. Be the first!</p>
          ) : (
            <ul className="divide-y divide-line">
              {entries.map((entry) => (
                <li key={entry.id} className="flex gap-3 py-3.5">
                  {entry.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element -- Supabase storage URL
                    <img src={entry.avatar_url} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" loading="lazy" />
                  ) : (
                    <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/15 text-sm font-bold uppercase text-accent-strong">
                      {entry.name.trim().charAt(0) || "?"}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-ink">{entry.name}</p>
                      <time dateTime={entry.created_at} className="shrink-0 font-mono text-[11px] text-dim">
                        {dateFormat.format(new Date(entry.created_at))}
                      </time>
                    </div>
                    <p className="mt-0.5 whitespace-pre-line text-sm leading-relaxed text-dim">{entry.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
