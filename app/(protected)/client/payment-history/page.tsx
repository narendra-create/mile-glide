import { PaymentHistoryList } from "@/app/components/PaymentHistoryList";
import { DUMMY_PROJECTS } from "@/app/components/seeds/PaymentsSeed";
import type { PaymentHistory } from "@/types/payment";

export default function ClientPaymentHistoryPage() {
  // Extract all payments from dummy projects
  const payments: PaymentHistory[] = DUMMY_PROJECTS.flatMap(
    (project) => project.payments
  );

  return (
    <main className="p-4 lg:p-8">
      <PaymentHistoryList initialPayments={payments} role="CLIENT" />
    </main>
  );
}
