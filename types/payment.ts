export type UpiPaymentProps = {
  upiId: string;
  label?: string;
  amount: number | "custom";
  qrCodeUrl?: string;
  onVerify?: (txnId: string) => void;
};
