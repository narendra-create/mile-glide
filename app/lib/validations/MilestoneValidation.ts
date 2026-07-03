import z, { string } from "zod";

export const createMilestoneSchema = z.object({
    projectId: string(),
    title: z.string(),
    subtitle: z.string().optional(),
    cost: z.number(),
    deadline: z.string(),
    description: z.string().max(80).optional()
});

export type createMilestoneInput = z.infer<typeof createMilestoneSchema>;

export const delayMilestoneSchema = z.object({
    milestoneId: z.string(),
    delayReason: z.string().max(360, "Max length is 360").optional(),
    newDeadline: z.coerce.date() //converts incoming string to date automatically
});

export type delayMilestoneInput = z.infer<typeof delayMilestoneSchema>;