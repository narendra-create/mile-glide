import z from "zod";

export const intiiatePaymentSchema = z.object({
    txn_number: z.string().min(4, "Too Short"),
    paymentId: z.string().min(1),
    paid_amount: z.number().positive().int()
});

export type intiiatePaymentInput = z.infer<typeof intiiatePaymentSchema>;