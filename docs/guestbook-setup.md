# Guestbook setup (Supabase)

The contact section has a guestbook. Until Supabase is connected it shows
"The guestbook opens soon" and the form is disabled, so the site works without it.

## 1. Create the database pieces

1. Create a free project at <https://supabase.com>.
2. Open **SQL Editor → New query**, paste the contents of `supabase/guestbook.sql` and run it.
   This creates:
   - the `guestbook_entries` table, with Row Level Security on and no public access
   - a public `guestbook-avatars` storage bucket (images only, 1 MB max)

## 2. Add the keys (yourself, never in chat or git)

In Supabase, go to **Project Settings → API** and copy two values:
- the Project URL
- the `service_role` secret key

Locally, create `.env.local` in the project root (it is already git-ignored):

```
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

On Vercel, add the same two variables under **Project → Settings → Environment Variables**, then redeploy.

The service role key stays on the server: only `app/api/guestbook/route.ts` reads it. Never rename it to `NEXT_PUBLIC_…`.

## 3. Moderation

Anyone can post. These protections are built in:
- length limits: name up to 40 characters, comment up to 500
- a hidden honeypot field to catch bots
- a best-effort limit of 3 posts per IP every 10 minutes
- photos checked by file signature: JPG, PNG or WebP only, 1 MB max

To hide a comment, open **Table Editor → guestbook_entries** and set `hidden` to `true`. Delete the row to remove it completely.
