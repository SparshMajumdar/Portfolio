"use client";

import { useState, FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-tertiary/8 to-transparent pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-tertiary/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10">
          <span className="text-[0.6875rem] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-tight mt-2 mb-4">
            Let&apos;s
            <br />
            Collaborate.
          </h1>
          <p className="text-on-surface-variant text-base max-w-lg leading-relaxed">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of something great.
          </p>
        </div>
      </section>

      {/* Contact Links */}
      <section className="px-8 mt-8">
        <h2 className="text-2xl font-bold text-on-surface mb-6 tracking-tight">
          Contact Channels — The Tracklist
        </h2>
        <div className="flex flex-col gap-1">
          {/* Header */}
          <div className="flex items-center px-4 py-2 border-b border-outline-variant/10 text-on-surface-variant text-[0.6875rem] uppercase font-bold tracking-[0.1em]">
            <div className="w-10">#</div>
            <div className="flex-1">Channel</div>
            <div className="w-1/3 text-right">Link</div>
          </div>

          {/* Email */}
          <a
            href="mailto:sparshmajumdar04@gmail.com"
            className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer"
          >
            <div className="w-10 text-on-surface-variant relative flex items-center">
              <span className="track-index text-sm font-medium">01</span>
              <span
                className="track-play hidden material-symbols-outlined text-primary absolute scale-90"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-xl">
                  mail
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Email
                </span>
                <span className="text-xs text-on-surface-variant">
                  Primary contact method
                </span>
              </div>
            </div>
            <div className="w-1/3 text-right text-on-surface-variant text-sm group-hover:text-primary transition-colors">
              sparshmajumdar04@gmail.com
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+918302040131"
            className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer"
          >
            <div className="w-10 text-on-surface-variant relative flex items-center">
              <span className="track-index text-sm font-medium">02</span>
              <span
                className="track-play hidden material-symbols-outlined text-primary absolute scale-90"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-xl">
                  phone
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Phone
                </span>
                <span className="text-xs text-on-surface-variant">
                  Direct line
                </span>
              </div>
            </div>
            <div className="w-1/3 text-right text-on-surface-variant text-sm group-hover:text-primary transition-colors">
              +91-8302040131
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sparsh-majumdar-03820b288/"
            target="_blank"
            rel="noopener noreferrer"
            className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer"
          >
            <div className="w-10 text-on-surface-variant relative flex items-center">
              <span className="track-index text-sm font-medium">03</span>
              <span
                className="track-play hidden material-symbols-outlined text-primary absolute scale-90"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-xl">
                  person_search
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold group-hover:text-primary transition-colors">
                  LinkedIn
                </span>
                <span className="text-xs text-on-surface-variant">
                  Professional network
                </span>
              </div>
            </div>
            <div className="w-1/3 text-right text-on-surface-variant text-sm group-hover:text-primary transition-colors">
              linkedin.com/in/sparsh-majumdar
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/SparshMajumdar"
            target="_blank"
            rel="noopener noreferrer"
            className="track-row flex items-center px-4 py-3 rounded-lg hover:bg-surface-container-highest transition-all group cursor-pointer"
          >
            <div className="w-10 text-on-surface-variant relative flex items-center">
              <span className="track-index text-sm font-medium">04</span>
              <span
                className="track-play hidden material-symbols-outlined text-primary absolute scale-90"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="w-10 h-10 rounded bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-fixed text-xl">
                  code
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface font-semibold group-hover:text-primary transition-colors">
                  GitHub
                </span>
                <span className="text-xs text-on-surface-variant">
                  Open source contributions
                </span>
              </div>
            </div>
            <div className="w-1/3 text-right text-on-surface-variant text-sm group-hover:text-primary transition-colors">
              github.com/SparshMajumdar
            </div>
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-8 mt-16 mb-24">
        <h2 className="text-2xl font-bold text-on-surface mb-6 tracking-tight">
          Drop a Message
        </h2>
        <div className="bg-surface-container-low p-8 rounded-xl max-w-2xl">
          {status === "success" && (
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">check_circle</span>
              Message sent successfully! I&apos;ll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">error</span>
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "submitting"}
                className="bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary transition-all outline-none disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "submitting"}
                className="bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary transition-all outline-none disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[0.6875rem] uppercase tracking-widest font-bold text-on-surface-variant">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === "submitting"}
                className="bg-surface-container-high border-none rounded-lg py-3 px-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary transition-all outline-none resize-none disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-fit bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-3 px-8 rounded-full text-sm hover:scale-105 transition-all duration-300 shadow-lg mt-2 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
            >
              {status === "submitting" ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
