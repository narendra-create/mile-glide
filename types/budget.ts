import type { BudgetRequestStatus } from "@/app/generated/prisma/enums";

export type BudgetRequestItem = {
  id: string;
  projectTitle: string;
  freelancerName: string;
  freelancerEmail: string;
  clientName: string;
  clientEmail: string;
  currentBudget: number;
  requestedAmount: number;
  extra: string;
  reason: string | null;
  status: BudgetRequestStatus;
  createdAt: Date;
  reviewedAt: Date | null;
};
