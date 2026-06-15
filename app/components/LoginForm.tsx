"use client";
import { useState } from "react";

// ─── Field definitions ──────────────────────────────────────────────────────────
const fields = [
  { id: "email",    label: "Email address", type: "email",    placeholder: "you@example.com",   autoComplete: "email" },
  { id: "password", label: "Password",      type: "password", placeholder: "Your password",     autoComplete: "current-password" },
] as const;

type FieldId = (typeof fields)[number]["id"];
type FormState = Record<FieldId, string>;

// ─── Component ──────────────────────────────────────────────────────────────────
export function LoginForm() {
  const [form, setForm] = useState<FormState>({
    email:    "",
    password: "",
  });
  const [errors, setErrors]     = useState<Partial<FormState>>({});
  const [loading, setLoading]   = useState(false);
  const [serverErr, setServerErr] = useState("");

  // ── Validation ────────────────────────────────────────────────────────────────
  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.email.includes("@"))  next.email    = "Enter a valid email address.";
    if (!form.password)             next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(id: FieldId, value: string) {
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id])  setErrors((prev) => ({ ...prev, [id]: undefined }));
    if (serverErr)   setServerErr("");
  }

  // ── Submit (wire your API route here) ─────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // TODO: call POST /api/auth/login  (or NextAuth signIn)
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="font-mono text-[8px] tracking-[2.5px] uppercase text-accent mb-3">
          — Welcome back
        </p>
        <h1 className="font-serif text-2xl lg:text-3xl text-ink">
          Log in.
        </h1>
        <p className="font-sans text-sm text-ink-muted mt-1.5">
          Pick up right where you left off.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {fields.map(({ id, label, type, placeholder, autoComplete }) => (
          <div key={id} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label
                htmlFor={id}
                className="font-mono text-[9px] tracking-[1.8px] uppercase text-[#7a7570]"
              >
                {label}
              </label>
              {/* Forgot password link — only on password field */}
              {id === "password" && (
                <a
                  href="/forgot-password"
                  className="font-mono text-[8px] tracking-wider uppercase text-[#3a3733] hover:text-[#7a7570] duration-150"
                >
                  Forgot?
                </a>
              )}
            </div>
            <input
              id={id}
              name={id}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              value={form[id]}
              onChange={(e) => handleChange(id, e.target.value)}
              className={`
                w-full bg-[#161616] border px-4 py-2.5
                font-sans text-[13px] text-ink placeholder:text-[#3a3733]
                focus:outline-none duration-150
                ${errors[id]
                  ? "border-[#c06060] focus:border-[#c06060]"
                  : "border-[#2a2a2a] focus:border-[#c8a96e]"
                }
              `}
            />
            {errors[id] && (
              <p className="font-sans text-[10px] text-[#c06060]">{errors[id]}</p>
            )}
          </div>
        ))}

        {/* Server-level error (wrong credentials etc.) */}
        {serverErr && (
          <p className="font-sans text-[11px] text-[#c06060] border border-[#5a2020] bg-[rgba(192,96,96,0.08)] px-4 py-2.5">
            {serverErr}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full py-3 bg-accent text-black font-mono text-[11px] uppercase tracking-wider hover:bg-accent-dim duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in…" : "Log in →"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-[#2a2a2a]" />
        <span className="font-mono text-[8px] tracking-wider uppercase text-[#3a3733]">or</span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
      </div>

      {/* Switch to register */}
      <p className="font-sans text-[11px] text-ink-muted text-center">
        Don&apos;t have an account?{" "}
        <a href="/register" className="text-accent hover:text-accent-dim duration-150 font-medium">
          Create one →
        </a>
      </p>

    </div>
  );
}
