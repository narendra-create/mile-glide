"use client";
import { motion } from "motion/react";
import { Check, Clock, Zap, CreditCard, CheckCircle } from "lucide-react";
import type { PaymentHistory } from "@/types/payment";
import { formatDate } from "@/app/lib/utilitys";
import Link from "next/link";
import { Paymentstatus } from "@/app/generated/prisma/enums";

const STATUS_CONFIG: Record<
  Paymentstatus,
  {
    label: string;
    dotColor: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
  }
> = {
  PAID: {
    label: "PAID",
    dotColor: "bg-[var(--color-dash-green)]",
    badgeBg: "bg-[var(--color-status-paid-bg)]",
    badgeBorder: "border-[var(--color-status-paid-border)]",
    badgeText: "text-dash-green",
  },
  DUE: {
    label: "DUE",
    dotColor: "bg-[var(--color-dash-gold)]",
    badgeBg: "bg-[var(--color-status-pending-bg)]",
    badgeBorder: "border-[var(--color-status-pending-border)]",
    badgeText: "text-[var(--color-dash-gold)]",
  },
  PENDING_VERIFICATION: {
    label: "VERIFICATION PENDING",
    dotColor: "bg-[var(--color-dash-amber)]",
    badgeBg: "bg-[var(--color-dash-amber-bg)]",
    badgeBorder: "border-[rgba(200,120,64,0.3)]",
    badgeText: "text-[var(--color-dash-amber)]",
  },
};

const STATUS_ICON: Record<Paymentstatus, React.ReactNode> = {
  PAID: <Check size={9} strokeWidth={2.5} />,
  DUE: <Clock size={9} strokeWidth={2.5} />,
  PENDING_VERIFICATION: <Zap size={9} strokeWidth={2.5} />,
};

interface PaymentHistoryCardProps {
  payment: PaymentHistory;
  index: number;
  role: "CLIENT" | "FREELANCER";
}

export function PaymentHistoryCard({ payment, index, role }: PaymentHistoryCardProps) {
  const cfg = STATUS_CONFIG[payment.payment_status];
  const isPaid = payment.payment_status === "PAID";
  const isDue = payment.payment_status === "DUE";
  const isPendingVerification = payment.payment_status === "PENDING_VERIFICATION";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: index * 0.055, ease: "easeOut" }}
      className="relative flex gap-0"
    >
      {/* Timeline Dot */}
      <div className="flex flex-col items-center mr-5 mt-[5px] shrink-0 w-[10px]">
        <div
          className={`w-[10px] h-[10px] rounded-full shrink-0 z-10 transition-all duration-300 ${cfg.dotColor} ${
            isDue ? "shadow-[0_0_8px_2px_var(--color-dash-gold)]" : isPendingVerification ? "shadow-[0_0_8px_2px_var(--color-dash-amber)]" : ""
          }`}
        />
      </div>

      {/* Card Content */}
      <div
        className={`flex-1 mb-4 border rounded-xl p-5 transition-all duration-200 group ${
          isDue
            ? "bg-[rgba(200,169,110,0.03)] border-[rgba(200,169,110,0.18)] hover:border-[rgba(200,169,110,0.28)]"
            : isPendingVerification
              ? "bg-[rgba(200,120,64,0.05)] border-[rgba(200,120,64,0.35)] hover:border-[rgba(200,120,64,0.55)] shadow-[0_0_24px_rgba(200,120,64,0.1)]"
              : "bg-[var(--color-dash-surface1)] border-[var(--color-dash-border)] hover:border-[var(--color-dash-border-hover)]"
        }`}
      >
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-serif text-[15px] lg:text-[22px] text-white leading-snug">
                {payment.project?.title || "Unknown Project"}
              </h3>
            </div>
            
            {isPaid ? (
               <span
                className={`inline-flex lg:my-1.5 lg:py-2 items-center gap-1 px-2 py-[3px] rounded-sm border font-mono text-[9px] lg:text-[11px] font-semibold tracking-[1.5px] uppercase ${cfg.badgeBg} ${cfg.badgeBorder} ${cfg.badgeText}`}
               >
                 {STATUS_ICON[payment.payment_status]}
                 PAID ON: {payment.completedAt ? formatDate(payment.completedAt, { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
               </span>
            ) : (
               <span
                className={`inline-flex lg:my-1.5 lg:py-2 items-center gap-1 px-2 py-[3px] rounded-sm border font-mono text-[9px] lg:text-[11px] font-semibold tracking-[1.5px] uppercase ${cfg.badgeBg} ${cfg.badgeBorder} ${cfg.badgeText}`}
               >
                 {STATUS_ICON[payment.payment_status]}
                 {cfg.label}
               </span>
            )}
          </div>
          <span
            className={`font-serif text-[16px] lg:text-[22px] shrink-0 tabular-nums ${
              isDue ? "text-[var(--color-dash-gold)]" : isPendingVerification ? "text-[var(--color-dash-amber)]" : "text-white"
            }`}
          >
            ₹{payment.total_cost.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Details Section */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tracking-[1px] text-dash-ink2/70 mb-3">
          <span>
            DUE DATE:{" "}
            <span className="text-[var(--color-dash-ink2)]">
              {formatDate(payment.due_date, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </span>
          <span>
            INITIATED:{" "}
            <span className="text-[var(--color-dash-ink2)]">
              {formatDate(payment.createdAt, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </span>
        </div>

        {/* Actions Section */}
        {role === "CLIENT" && isDue && (
          <div className="mt-4 pt-4 border-t border-[rgba(200,169,110,0.15)] flex items-center justify-between gap-3">
            <p className="font-mono text-[9px] tracking-[1.5px] uppercase text-[var(--color-dash-ink3)]">
              Payment required
            </p>
            <Link href={`/client/pay-now/${payment.id}`}>
              <button
                className="flex items-center gap-1.5 px-4 py-2 bg-[rgba(200,169,110,0.1)] border border-[rgba(200,169,110,0.3)] rounded-md font-mono text-[10px] tracking-[1.5px] uppercase text-[var(--color-dash-gold)] hover:bg-[rgba(200,169,110,0.18)] hover:border-[rgba(200,169,110,0.5)] transition-all duration-200"
              >
                <CreditCard size={11} strokeWidth={2} />
                Pay Now
              </button>
            </Link>
          </div>
        )}

        {role === "FREELANCER" && isPendingVerification && (
          <div className="mt-4 pt-4 border-t border-[rgba(200,120,64,0.15)] flex items-center justify-between gap-3">
            <p className="font-mono text-[9px] tracking-[1.5px] uppercase text-[var(--color-dash-ink3)]">
              Verification required
            </p>
            <Link href={`/freelancer/verify-payment/${payment.id}`}>
              <button
                className="flex items-center gap-1.5 px-4 py-2 bg-[rgba(200,120,64,0.1)] border border-[rgba(200,120,64,0.3)] rounded-md font-mono text-[10px] tracking-[1.5px] uppercase text-[var(--color-dash-amber)] hover:bg-[rgba(200,120,64,0.18)] hover:border-[rgba(200,120,64,0.5)] transition-all duration-200"
              >
                <CheckCircle size={11} strokeWidth={2} />
                Verify Payment
              </button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
