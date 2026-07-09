import { PaymentHistoryList } from "@/app/components/PaymentHistoryList";
import { getPaymentHistory } from "@/app/lib/controllers/paymentController";
import { StateDisplay } from "@/app/components/StateDisplay";

export default async function ClientPaymentHistoryPage() {
  const result = await getPaymentHistory();
  
  if (!result.success) {
    return (
      <main className="p-4 lg:p-8">
        <StateDisplay 
          type="error" 
          title="Failed to Load History"
          message={result.error || "We couldn't retrieve your payment history right now."}
        />
      </main>
    );
  }

  if (result.payments.length === 0) {
    return (
      <main className="p-4 lg:p-8">
        <StateDisplay 
          type="empty" 
          title="No Payment History"
          message="You haven't made any payments yet. When you do, they will appear here."
        />
      </main>
    );
  }

  return (
    <main className="p-4 lg:p-8">
      <PaymentHistoryList initialPayments={result.payments} role="CLIENT" cursor={result.nextCursor} />
    </main>
  );
}
