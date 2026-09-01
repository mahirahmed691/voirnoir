"use client";

import { FormEvent, useState } from "react";

const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@voirnoir.co.uk";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Voir Noir, from ${name || "the site"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? `\n${email}` : ""}`,
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="max-w-md text-lg leading-relaxed text-bone-dim" role="status">
        Your mail app should be open. If nothing appeared, write to{" "}
        <a href={`mailto:${contactEmail}`} className="text-bone underline">
          {contactEmail}
        </a>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className="min-h-12 rounded-2xl border border-bone/15 bg-ink-soft px-4 text-bone outline-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="min-h-12 rounded-2xl border border-bone/15 bg-ink-soft px-4 text-bone outline-none"
        />
        <p className="text-xs text-bone-dim">We only use this to reply.</p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[0.7rem] uppercase tracking-[0.22em] text-bone-dim">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="rounded-2xl border border-bone/15 bg-ink-soft px-4 py-3 text-bone outline-none"
        />
      </div>
      <button
        type="submit"
        className="group inline-flex items-center gap-3 rounded-full bg-bone py-2 pl-5 pr-2 text-sm text-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
      >
        <span>Open email</span>
        <span
          className="grid size-8 place-items-center rounded-full bg-ink/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
          aria-hidden="true"
        >
          →
        </span>
      </button>
    </form>
  );
}
