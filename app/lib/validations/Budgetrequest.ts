import z from "zod";

export const createBudgetRequestSchema = z.object({
    requestedAmount: z.number().positive(),
    reason: z.string().optional(),
    projectId: z.string()
});

export type createBudgetInput = z.infer<typeof createBudgetRequestSchema>; 