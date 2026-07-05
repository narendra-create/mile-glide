import { prisma } from "@/app/lib/prisma";
import { createBudgetInput } from "../validations/Budgetrequest";
import { getSession } from "../session";

export const raiseBudgetRequest = async (input: createBudgetInput) => {
    const session = await getSession();
    if (!session) return { success: false, error: "Unauthorized", status: 401 };
    if (session.user.role.toLowerCase() !== "freelancer") return { success: false, error: "Forbidden", status: 403 };

    const freelancer = await prisma.freelancer.findUnique({
        where: { userId: session.user.id },
        select: { id: true }
    });
    if (!freelancer) return { success: false, error: "Profile Not found", status: 404 };

    const project = await prisma.project.findFirst({
        where: { id: input.projectId, freelancerId: freelancer.id },
        include: {
            milestones: {
                select: {
                    milestonecost: true
                }
            }
        }
    });
    if (!project) {
        return { success: false, error: "This project is not associated with your account", status: 403 };
    };

    if (project.status !== "ACTIVE" && project.status !== "STOPPED") {
        return { success: false, error: "Requests can only be created for active/stopped projects", status: 422 };
    };

    const totalUsed = project.milestones.reduce((sum, m) => sum + m.milestonecost, 0);
    const remainingCost = project.agreedCost - totalUsed;
    const newBudget = project.agreedCost + input.requestedAmount;

    if (input.requestedAmount < remainingCost) {
        return { success: false, error: "Use Your Remaining Budget First", status: 400 }
    };

    try {
        const createdRequest = await prisma.budgetRaiseRequest.create({
            data: {
                projectId: project.id,
                currentBudget: project.agreedCost,
                reason: input.reason,
                requestedBudget: newBudget,
                requestedById: freelancer.id,
                status: "PENDING"
            }
        });

        return { success: true, request: createdRequest, extra: `+${input.requestedAmount}`, status: 201 }
    }
    catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : "Server Error",
            status: 500
        };
    }
}