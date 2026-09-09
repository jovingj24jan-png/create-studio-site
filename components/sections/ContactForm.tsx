"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Bits";

type Fields = { name: string; company: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", company: "", email: "", message: "" };

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  if (!v.email.trim()) e.email = "We need an email to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = "That email does not look right.";
  if (v.message.trim().length < 12) e.message = "A sentence or two helps us prepare.";
  return e;
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  required = false,
  autoComplete,
}: {
  id: keyof Fields;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  autoComplete?: string;
}) {
  const common = {
    id,
    name: id,
    value,
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-err` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    className:
      "t-lead w-full bg-transparent py-4 outline-none transition-colors placeholder:text-[var(--rule)]",
    style: { borderBottom: `1px solid ${error ? "var(--accent)" : "var(--rule)"}` },
    placeholder: label,
  };

  return (
    <div className="py-2">
      <label htmlFor={id} className="label block">
        {label}
        {required && <span style={{ color: "var(--accent)" }}> *</span>}
      </label>
      {textarea ? (
        <textarea {...common} rows={4} />
      ) : (
        <input {...common} type={type} inputMode={type === "email" ? "email" : undefined} />
      )}
      {error && (
        <p id={`${id}-err`} className="label mt-2" style={{ color: "var(--accent)" }} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [v, setV] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof Fields) => (val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // Prototype only — the message is not transmitted anywhere.
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSent(true);
      setV(empty);
    }, 700);
  };

  return (
    <section className="section" aria-labelledby="contact-form-heading">
      <div className="shell">
        <div className="rule-t grid gap-10 pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 id="contact-form-heading" className="t-h2">
              Let&apos;s talk
            </h2>
            <p className="t-body mt-4 max-w-[32ch]" style={{ color: "var(--muted)" }}>
              We would like to hear from you and your team. Most enquiries get a reply within a day.
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            {sent ? (
              <Reveal>
                <div className="p-8 md:p-10" style={{ background: "var(--mist)" }}>
                  <p className="label" style={{ color: "var(--accent)" }}>
                    Received
                  </p>
                  <h3 className="t-h3 mt-3 max-w-[20ch]">Thanks — that came through.</h3>
                  <p className="t-body mt-4 max-w-[40ch]" style={{ color: "var(--muted)" }}>
                    This is a front-end prototype, so nothing was actually sent. In the real thing you
                    would hear back within one working day.
                  </p>
                  <button type="button" className="btn btn-outline mt-7" onClick={() => setSent(false)}>
                    <span>Send another</span>
                    <Arrow />
                  </button>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={submit} noValidate>
                <Field
                  id="name"
                  label="Your name"
                  value={v.name}
                  onChange={set("name")}
                  error={errors.name}
                  autoComplete="name"
                  required
                />
                <Field
                  id="company"
                  label="Company"
                  value={v.company}
                  onChange={set("company")}
                  error={errors.company}
                  autoComplete="organization"
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={v.email}
                  onChange={set("email")}
                  error={errors.email}
                  autoComplete="email"
                  required
                />
                <Field
                  id="message"
                  label="Your message"
                  value={v.message}
                  onChange={set("message")}
                  error={errors.message}
                  textarea
                  required
                />

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button type="submit" className="btn btn-dark btn-lg" disabled={busy}>
                    <span>{busy ? "Sending…" : "Submit"}</span>
                    <Arrow />
                  </button>
                  <p className="label max-w-[28ch]">
                    By submitting, you agree to our terms of service.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
