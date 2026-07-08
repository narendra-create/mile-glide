import { DUMMY_VERIFICATIONS } from "@/app/components/seeds/VerifyPaymentsSeed";
import { VerifyPaymentsList } from "@/app/components/VerifyPaymentsList";

const VerifyPaymentsPage = () => {
  return (
    <main>
      <VerifyPaymentsList
        initialVerifications={DUMMY_VERIFICATIONS}
        role="CLIENT"
      />
    </main>
  );
};

export default VerifyPaymentsPage;
