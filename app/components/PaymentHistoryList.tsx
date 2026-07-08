"use client";

import { useState } from "react";
import { PaymentHistoryCard } from "./Cards/PaymentHistoryCard";
import type { PaymentHistory } from "@/types/payment";
import { Paymentstatus } from "@/app/generated/prisma/enums";

interface PaymentHistoryListProps {
  initialPayments: PaymentHistory[];
  role: "CLIENT" | "FREELANCER";
}

export function PaymentHistoryList({ initialPayments, role }: PaymentHistoryListProps) {
  const [dueDisplayCount, setDueDisplayCount] = useState(5);
  const [pendingDisplayCount, setPendingDisplayCount] = useState(5);
  const [paidDisplayCount, setPaidDisplayCount] = useState(5);
  
  // Sort all payments: newest created first
  const sortedPayments = [...initialPayments].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Split into Due, Pending Verification, and Paid
  const duePayments = sortedPayments.filter(
    (p) => p.payment_status === Paymentstatus.DUE
  );
  
  const pendingPayments = sortedPayments.filter(
    (p) => p.payment_status === Paymentstatus.PENDING_VERIFICATION
  );

  const paidPayments = sortedPayments.filter(
    (p) => p.payment_status === Paymentstatus.PAID
  );

  const visibleDue = duePayments.slice(0, dueDisplayCount);
  const visiblePending = pendingPayments.slice(0, pendingDisplayCount);
  const visiblePaid = paidPayments.slice(0, paidDisplayCount);
  
  const hasMoreDue = dueDisplayCount < duePayments.length;
  const hasMorePending = pendingDisplayCount < pendingPayments.length;
  const hasMorePaid = paidDisplayCount < paidPayments.length;

  return (
    <div className="w-full py-4 lg:py-8 relative min-h-screen">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[500px] bg-[var(--color-status-pending-bg)] opacity-30 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[600px] bg-[var(--color-status-paid-bg)] opacity-20 rounded-full blur-[120px]" />
      </div>

      <h1 className="font-serif text-[28px] lg:text-[36px] mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-dash-ink2)]">
        Payment History
      </h1>

      {/* Due Payments Section */}
      <div className="mb-12">
        <h2 className="font-serif text-[20px] lg:text-[24px] text-white mb-6 flex items-center gap-3">
          Due Payments
          <span className="bg-[var(--color-status-pending-bg)] text-[var(--color-dash-gold)] border border-[var(--color-status-pending-border)] font-mono text-[10px] px-2 py-0.5 rounded-sm tabular-nums">
            {duePayments.length}
          </span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {visibleDue.map((payment, index) => (
            <PaymentHistoryCard 
              key={payment.id} 
              payment={payment} 
              index={index} 
              role={role} 
            />
          ))}
          
          {visibleDue.length === 0 && (
            <div className="col-span-1 lg:col-span-2 text-center py-8 border border-dashed border-[var(--color-dash-border)] rounded-xl font-mono text-[11px] text-[var(--color-dash-ink3)]">
              No due payments at the moment.
            </div>
          )}
        </div>

        {hasMoreDue && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setDueDisplayCount(prev => prev + 5)}
              className="px-6 py-2.5 border border-[var(--color-dash-border)] rounded-md font-mono text-[11px] lg:text-[13px] tracking-[1.5px] uppercase text-[var(--color-dash-ink2)] hover:text-white hover:border-[var(--color-dash-border-hover)] bg-[var(--color-dash-surface1)] transition-colors"
            >
              Load More Due
            </button>
          </div>
        )}
      </div>

      {/* Verification Pending Section */}
      <div className="mb-12">
        <h2 className="font-serif text-[20px] lg:text-[24px] text-white mb-6 flex items-center gap-3">
          Verification Pending
          <span className="bg-[var(--color-dash-amber-bg)] text-[var(--color-dash-amber)] border border-[rgba(200,120,64,0.3)] font-mono text-[10px] px-2 py-0.5 rounded-sm tabular-nums">
            {pendingPayments.length}
          </span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {visiblePending.map((payment, index) => (
            <PaymentHistoryCard 
              key={payment.id} 
              payment={payment} 
              index={index} 
              role={role} 
            />
          ))}
          
          {visiblePending.length === 0 && (
            <div className="col-span-1 lg:col-span-2 text-center py-8 border border-dashed border-[var(--color-dash-border)] rounded-xl font-mono text-[11px] text-[var(--color-dash-ink3)]">
              No payments pending verification.
            </div>
          )}
        </div>

        {hasMorePending && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setPendingDisplayCount(prev => prev + 5)}
              className="px-6 py-2.5 border border-[var(--color-dash-border)] rounded-md font-mono text-[11px] lg:text-[13px] tracking-[1.5px] uppercase text-[var(--color-dash-ink2)] hover:text-white hover:border-[var(--color-dash-border-hover)] bg-[var(--color-dash-surface1)] transition-colors"
            >
              Load More Pending
            </button>
          </div>
        )}
      </div>

      {/* Paid Payments Section */}
      <div>
        <h2 className="font-serif text-[20px] lg:text-[24px] text-white mb-6 flex items-center gap-3">
          Paid Payments
          <span className="bg-[var(--color-status-paid-bg)] text-[var(--color-dash-green)] border border-[var(--color-status-paid-border)] font-mono text-[10px] px-2 py-0.5 rounded-sm tabular-nums">
            {paidPayments.length}
          </span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {visiblePaid.map((payment, index) => (
            <PaymentHistoryCard 
              key={payment.id} 
              payment={payment} 
              index={index} 
              role={role} 
            />
          ))}
          
          {visiblePaid.length === 0 && (
            <div className="col-span-1 lg:col-span-2 text-center py-8 border border-dashed border-[var(--color-dash-border)] rounded-xl font-mono text-[11px] text-[var(--color-dash-ink3)]">
              No paid payments found.
            </div>
          )}
        </div>

        {hasMorePaid && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setPaidDisplayCount(prev => prev + 5)}
              className="px-6 py-2.5 border border-[var(--color-dash-border)] rounded-md font-mono text-[11px] lg:text-[13px] tracking-[1.5px] uppercase text-[var(--color-dash-ink2)] hover:text-white hover:border-[var(--color-dash-border-hover)] bg-[var(--color-dash-surface1)] transition-colors"
            >
              Load More Paid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
