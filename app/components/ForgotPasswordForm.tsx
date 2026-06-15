"use client";
import { useState } from "react";
import { OtpInput } from "./OtpInput";

// ─── password strength ────────────────────────────────────────────────────────
const STRENGTH_LABELS = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["#c06060", "#c87840", "#c8a96e", "#9acd87", "#4a9e75"];

function getStrength(pw: string): number {
  let score = 0;
  if (pw.length >= 8)             score++;
  if (/[A-Z]/.test(pw))           score++;
  if (/[a-z]/.test(pw))           score++;
  if (/[0-9]/.test(pw))           score++;
  if (/[^A-Za-z0-9]/.test(pw))    score++;
  return score;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── component ────────────────────────────────────────────────────────────────
export function ForgotPasswordForm() {
  const [step, setStep]                 = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail]               = useState("");
  const [emailError, setEmailError]     = useState("");
  const [newPassword, setNewPassword]   = useState("");
  const [confirmPw, setConfirmPw]       = useState("");
  const [pwErrors, setPwErrors]         = useState<{ new?: string; confirm?: string }>({});
  const [loading, setLoading]           = useState(false);
  const [done, setDone]                 = useState(false);

  const strength = newPassword.length > 0 ? getStrength(newPassword) : 0;

  // ─── step 1 — email ───────────────────────────────────────────────────────
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    // await fetch("/api/auth/forgot-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });
    setLoading(false);
    setStep("otp");
  }

  // ─── step 2 — otp verify ──────────────────────────────────────────────────
  async function handleOtpVerify(otp: string) {
    // await fetch("/api/auth/verify-reset-otp", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, otp }),
    // });
    console.log("reset otp:", otp);
    setStep("reset");
  }

  // ─── step 3 — new password ────────────────────────────────────────────────
  async function handleResetSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: { new?: string; confirm?: string } = {};
    if (newPassword.length < 8)        next.new     = "Password must be at least 8 characters.";
    if (confirmPw !== newPassword)     next.confirm  = "Passwords do not match.";
    setPwErrors(next);
    if (Object.keys(next).length > 0)  return;

    setLoading(true);
    // await fetch("/api/auth/reset-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password: newPassword }),
    // });
    setLoading(false);
    setDone(true);
  }

  // ─── done ─────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8">
          <p className="font-mono text-[8px] tracking-[2.5px] uppercase text-accent mb-3">
            — All done
          </p>
          <h1 className="font-serif text-2xl lg:text-3xl text-ink">Password updated.</h1>
          <p className="font-sans text-sm text-ink-muted mt-1.5">
            You can now log in with your new password.
          </p>
        </div>
        <a
          href="/login"
          className="block w-full py-3 bg-accent text-black font-mono text-[11px] uppercase tracking-wider hover:bg-accent-dim duration-150 text-center"
        >
          Go to login →
        </a>
      </div>
    );
  }

  // ─── email step ───────────────────────────────────────────────────────────
  if (step === "email") {
    return (
      <div className="w-full max-w-md mx-auto">

        <div className="mb-8">
          <p className="font-mono text-[8px] tracking-[2.5px] uppercase text-accent mb-3">
            — Reset password
          </p>
          <h1 className="font-serif text-2xl lg:text-3xl text-ink">Forgot your password?</h1>
          <p className="font-sans text-sm text-ink-muted mt-1.5">
            Enter your email and we&apos;ll send you a reset code.
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="reset-email"
              className="font-mono text-[9px] tracking-[1.8px] uppercase text-[#7a7570]"
            >
              Email address
            </label>
            <input
              id="reset-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className={`
                w-full bg-[#161616] border px-4 py-2.5
                font-sans text-[13px] text-ink placeholder:text-[#3a3733]
                focus:outline-none duration-150
                ${emailError
                  ? "border-[#c06060] focus:border-[#c06060]"
                  : "border-[#2a2a2a] focus:border-[#c8a96e]"
                }
              `}
            />
            {emailError && (
              <p className="font-sans text-[10px] text-[#c06060]">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full py-3 bg-accent text-black font-mono text-[11px] uppercase tracking-wider hover:bg-accent-dim duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending…" : "Send reset code →"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#2a2a2a]" />
          <span className="font-mono text-[8px] tracking-wider uppercase text-[#3a3733]">or</span>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </div>

        <p className="font-sans text-[11px] text-ink-muted text-center">
          Remembered it?{" "}
          <a href="/login" className="text-accent hover:text-accent-dim duration-150 font-medium">
            Log in →
          </a>
        </p>

      </div>
    );
  }

  // ─── otp step ─────────────────────────────────────────────────────────────
  if (step === "otp") {
    return (
      <div className="w-full max-w-md mx-auto">

        <div className="mb-8">
          <p className="font-mono text-[8px] tracking-[2.5px] uppercase text-accent mb-3">
            — Verify identity
          </p>
          <h1 className="font-serif text-2xl lg:text-3xl text-ink">Check your inbox.</h1>
          <p className="font-sans text-sm text-ink-muted mt-1.5">
            We sent a 6-digit code to{" "}
            <span className="text-ink">{email}</span>.
          </p>
        </div>

        <OtpInput
          onVerify={handleOtpVerify}
          onResend={() => { /* TODO: resend call */ }}
        />

        <p className="font-sans text-[11px] text-ink-muted text-center mt-6">
          Wrong email?{" "}
          <button
            onClick={() => setStep("email")}
            className="text-accent hover:text-accent-dim duration-150 font-medium"
          >
            Go back
          </button>
        </p>

      </div>
    );
  }

  // ─── reset step ───────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-md mx-auto">

      <div className="mb-8">
        <p className="font-mono text-[8px] tracking-[2.5px] uppercase text-accent mb-3">
          — New password
        </p>
        <h1 className="font-serif text-2xl lg:text-3xl text-ink">Set a new password.</h1>
        <p className="font-sans text-sm text-ink-muted mt-1.5">Make it a good one.</p>
      </div>

      <form onSubmit={handleResetSubmit} noValidate className="flex flex-col gap-5">

        {/* new password */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="new-password"
            className="font-mono text-[9px] tracking-[1.8px] uppercase text-[#7a7570]"
          >
            New password
          </label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setPwErrors((p) => ({ ...p, new: "" }));
            }}
            className={`
              w-full bg-[#161616] border px-4 py-2.5
              font-sans text-[13px] text-ink placeholder:text-[#3a3733]
              focus:outline-none duration-150
              ${pwErrors.new
                ? "border-[#c06060] focus:border-[#c06060]"
                : "border-[#2a2a2a] focus:border-[#c8a96e]"
              }
            `}
          />

          {/* strength meter */}
          {newPassword.length > 0 && (
            <div className="flex flex-col gap-1 mt-0.5">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-[2px] duration-300"
                    style={{
                      background: i < strength
                        ? STRENGTH_COLORS[strength - 1]
                        : "#2a2a2a",
                    }}
                  />
                ))}
              </div>
              <p
                className="font-mono text-[9px] tracking-wide"
                style={{ color: STRENGTH_COLORS[strength - 1] }}
              >
                {STRENGTH_LABELS[strength - 1]}
              </p>
            </div>
          )}

          {pwErrors.new && (
            <p className="font-sans text-[10px] text-[#c06060]">{pwErrors.new}</p>
          )}
        </div>

        {/* confirm */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirm-password"
            className="font-mono text-[9px] tracking-[1.8px] uppercase text-[#7a7570]"
          >
            Confirm password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            value={confirmPw}
            onChange={(e) => {
              setConfirmPw(e.target.value);
              setPwErrors((p) => ({ ...p, confirm: "" }));
            }}
            className={`
              w-full bg-[#161616] border px-4 py-2.5
              font-sans text-[13px] text-ink placeholder:text-[#3a3733]
              focus:outline-none duration-150
              ${pwErrors.confirm
                ? "border-[#c06060] focus:border-[#c06060]"
                : "border-[#2a2a2a] focus:border-[#c8a96e]"
              }
            `}
          />
          {pwErrors.confirm && (
            <p className="font-sans text-[10px] text-[#c06060]">{pwErrors.confirm}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full py-3 bg-accent text-black font-mono text-[11px] uppercase tracking-wider hover:bg-accent-dim duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving…" : "Update password →"}
        </button>

      </form>

    </div>
  );
}
