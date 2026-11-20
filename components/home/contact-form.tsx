"use client";

import { useState, type FormEvent } from "react";
import { Mail, MessageSquare, Send, User } from "lucide-react";

/**
 * "Get in touch" form with no backend: Send opens the visitor's own email
 * app with the message addressed to Riswan and filled in.
 */
export function ContactForm({ to }: { to: string }) {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-line-2 bg-canvas py-3 pl-10 pr-3 text-sm text-ink placeholder:text-dim/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

  return (
    <form onSubmit={submit} className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-7" aria-labelledby="get-in-touch">
      <h3 id="get-in-touch" className="text-2xl font-bold tracking-tight text-accent-strong">
        Get in touch
      </h3>
      <p className="mt-1 text-sm text-dim">Something to discuss? Send a message directly.</p>

      <div className="mt-6 space-y-3">
        <label className="relative block">
          <span className="sr-only">Your name</span>
          <User size={16} aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 text-dim" />
          <input name="name" required maxLength={80} autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="relative block">
          <span className="sr-only">Your email</span>
          <Mail size={16} aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 text-dim" />
          <input name="email" type="email" required maxLength={120} autoComplete="email" placeholder="Your email" className={field} />
        </label>
        <label className="relative block">
          <span className="sr-only">Your message</span>
          <MessageSquare size={16} aria-hidden className="pointer-events-none absolute left-3.5 top-3.5 text-dim" />
          <textarea name="message" required rows={4} maxLength={2000} placeholder="Your message" className={`${field} resize-y`} />
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-on-accent shadow-[0_10px_30px_-12px_var(--accent)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <Send size={16} aria-hidden /> Send message
      </button>
      <p aria-live="polite" className="mt-3 min-h-5 text-xs text-dim">
        {sent && (
          <>
            Your email app should open now. If it doesn’t, write to{" "}
            <a href={`mailto:${to}`} className="font-semibold text-accent-strong underline">
              {to}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
