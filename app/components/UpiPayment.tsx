"use client";
import { useState } from "react";
import { Smartphone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { UpiPaymentProps } from "@/types/payment";

// ─── PLACEHOLDER QR ───────────────────────────────────────────────────────────

function PlaceholderQR() {
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1],
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(21, 1fr)`,
        gap: "2px",
        padding: "14px",
        background: "var(--color-dash-surface2)",
        border: "1px solid var(--color-dash-border)",
        borderRadius: "10px",
        width: "fit-content",
        margin: "0 auto",
      }}
    >
      {pattern.flat().map((cell, i) => (
        <div
          key={i}
          style={{
            width: "9px",
            height: "9px",
            borderRadius: "1.5px",
            background: cell
              ? "var(--color-dash-gold)"
              : "transparent",
            opacity: cell ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function UpiPayment({ upiId, label, amount, qrCodeUrl, onVerify }: UpiPaymentProps) {
  const isCustom = amount === "custom";
  const [customAmount, setCustomAmount] = useState("");
  const [txnId, setTxnId] = useState("");
  const [paid, setPaid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const displayAmount = isCustom
    ? customAmount
      ? `₹${Number(customAmount).toLocaleString("en-IN")}`
      : null
    : `₹${(amount as number).toLocaleString("en-IN")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txnId.trim()) return;
    setSubmitted(true);
    onVerify?.(txnId.trim());
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-[var(--color-dash-surface1)] border border-[var(--color-dash-border)] rounded-xl overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-[var(--color-dash-border)]">
          <div className="flex items-center gap-2 mb-1">
            <Smartphone size={13} className="text-[var(--color-dash-gold)]" />
            <span className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--color-dash-gold)]">
              UPI Payment
            </span>
          </div>
          {label && (
            <p className="font-mono text-[9px] tracking-[2px] uppercase text-[var(--color-dash-ink3)] mt-1">
              {label}
            </p>
          )}
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">

          {/* Amount */}
          {isCustom ? (
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-[1.5px] uppercase text-[var(--color-dash-ink3)]">
                Amount (₹)
              </label>
              <input
                type="number"
                min={1}
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-[var(--color-dash-surface2)] border border-[var(--color-dash-border)] rounded-md px-4 py-3 font-serif text-[22px] text-[var(--color-dash-gold)] placeholder:text-[var(--color-dash-ink4)] placeholder:text-[15px] placeholder:font-sans focus:outline-none focus:border-[var(--color-dash-border-hover)] duration-200"
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="font-mono text-[9px] tracking-[2px] uppercase text-[var(--color-dash-ink3)] mb-1">
                {label ?? "Payment Amount"}
              </p>
              <p className="font-serif text-[36px] text-[var(--color-dash-gold)] leading-none tracking-tight">
                {displayAmount}
              </p>
            </div>
          )}

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3">
            {qrCodeUrl ? (
              <div className="border border-[var(--color-dash-border)] rounded-[10px] overflow-hidden bg-[var(--color-dash-surface2)] p-3">
                <img
                  src={qrCodeUrl}
                  alt="UPI QR Code"
                  className="w-[168px] h-[168px] object-contain"
                />
              </div>
            ) : (
              <PlaceholderQR />
            )}

            {/* UPI ID */}
            <div className="flex flex-col items-center gap-[3px]">
              <p className="font-mono text-[11px] text-[var(--color-dash-ink2)] tracking-wide">
                {upiId}
              </p>
              <p className="font-mono text-[9px] tracking-[1.5px] uppercase text-[var(--color-dash-ink4)]">
                Pay via any UPI app · Then submit transaction ID
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[var(--color-dash-border)]" />

          {/* I Have Paid — only for preset amounts */}
          {!isCustom && !paid && (
            <button
              type="button"
              onClick={() => setPaid(true)}
              className="w-full py-[11px] bg-transparent border border-[var(--color-dash-border-hover)] rounded-md text-white font-mono text-[10px] uppercase tracking-[1.5px] hover:bg-[var(--color-dash-surface2)] hover:border-[var(--color-dash-gold-dim)] hover:text-[var(--color-dash-gold)] transition-all duration-200"
            >
              I Have Paid →
            </button>
          )}

          {/* Transaction form — shown after "I Have Paid" or for custom amounts */}
          <AnimatePresence>
            {(paid || isCustom) && !submitted && (
              <motion.form
                key="txn-form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-[1.5px] uppercase text-[var(--color-dash-ink3)]">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 426781234567"
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value)}
                    required
                    className="w-full bg-[var(--color-dash-surface2)] border border-[var(--color-dash-border)] rounded-md px-4 py-3 font-sans text-[13px] text-white placeholder:text-[var(--color-dash-ink4)] focus:outline-none focus:border-[var(--color-dash-border-hover)] duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-[11px] bg-transparent border border-[var(--color-dash-border-hover)] rounded-md text-white font-mono text-[10px] uppercase tracking-[1.5px] hover:bg-[var(--color-dash-surface2)] hover:border-[var(--color-dash-gold-dim)] hover:text-[var(--color-dash-gold)] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!txnId.trim() || (isCustom && !customAmount)}
                >
                  Submit Transaction →
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Success state */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-2 py-2"
              >
                <CheckCircle2 size={28} className="text-[var(--color-dash-green)]" />
                <p className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--color-dash-green)]">
                  Submitted for Verification
                </p>
                <p className="font-sans text-[12px] text-[var(--color-dash-ink3)] text-center">
                  We'll confirm your payment shortly.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}
