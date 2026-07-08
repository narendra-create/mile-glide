export interface VerifyPaymentType {
  id: string;
  txn_number: string;
  paymentid: string;
  paid_amount: number;
  imageurl?: string | null;
  freelancerId: string;
  clientId: string;
  
  // Relations
  Payment?: {
    due_date: Date;
    project?: {
      title: string;
    } | null;
  } | null;

  client?: {
    user: {
      name: string;
    };
  } | null;

  freelancer?: {
    user: {
      name: string;
    };
  } | null;
}
