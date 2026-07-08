import { VerifyPaymentsList } from "@/app/components/VerifyPaymentsList";
import { DUMMY_VERIFICATIONS } from "@/app/components/seeds/VerifyPaymentsSeed";

const VerifyPaymentsPage = () => {
  return (
    <main>
      <VerifyPaymentsList
        initialVerifications={DUMMY_VERIFICATIONS}
        role="FREELANCER"
      />
    </main>
  );
};

export default VerifyPaymentsPage;
