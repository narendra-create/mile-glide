import { prisma } from "@/app/lib/prisma";


export const getClientStat = async (freelancerid: string) => {
    const result = await prisma.$queryRaw<
        { count: bigint }[]
    >`SELECT COUNT(DISTINCT "clientId") as count
       FROM "Project"
       WHERE "freelancerId" = ${freelancerid}`

    return Number(result[0].count)
}

export const getCurrentProjects = async (freelancerid: string, cursor?: string) => {
    if (!freelancerid) {
        return { success: false, error: "Invalid freelancer id", status: 400 }
    }
    const result = await prisma.project.findMany({
        take: 4,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        where: {
            freelancerId: freelancerid, status: {
                not: "COMPLETED"
            }
        },
        select: {
            id: true,
            title: true,
            client: {
                select: {
                    user: {
                        select: {
                            name: true,
                            image: true,
                        }
                    }
                }
            },
            payments: {
                select: {
                    due_date: true,
                    paid_amount: true,
                    total_cost: true,
                    payment_status: true
                }
            },
            status: true,
            milestones: {
                select: {
                    status: true,
                    deadline: true
                },
                orderBy: {
                    deadline: "desc"
                }
            },
            createdAt: true
        }
    });

    const projects = result.map((project) => {
        const totalMilestones = project.milestones.length;
        const completedMilestones =
            project.milestones.filter(
                milestone => milestone.status === "approved"
            ).length;

        const progress =
            totalMilestones === 0
                ? 0
                : Math.round(
                    (completedMilestones / totalMilestones) * 100
                );

        const lastMilestone = project.milestones[0];
        const projectDeadline = lastMilestone?.deadline;

        //Payments
        const totalAmount = project.payments.reduce((sum, p) => sum + p.total_cost, 0);
        const received = project.payments.reduce((sum, p) => sum + p.paid_amount, 0);

        return {
            id: project.id,
            title: project.title,
            client: project.client,
            money: {
                totalAmount,
                received,
                remaining: totalAmount - received
            },
            status: project.status,
            stats: {
                totalMilestones,
                completedMilestones,
                progress,
                projectDeadline
            }

        }

    });
    const nextCursor = projects.length === 4 ? projects[projects.length - 1].id : null;

    return { success: true, projects: projects, nextCursor }
}

export const getMoneyStats = async (freelancerId: string) => {
    if (!freelancerId) {
        return { success: false, error: "Invalid freelancer id", status: 400 }
    };
    const freelancerFound = await prisma.freelancer.findUnique({
        where: { id: freelancerId },
        select: {
            id: true
        }
    });

    if (!freelancerFound) return { success: false, error: "Freelancer Not found", status: 404 };

    const paymentsfound = await prisma.payment.aggregate({
        where: { project: { freelancerId: freelancerFound.id } },
        _sum: {
            total_cost: true,
            paid_amount: true
        }
    });

    const lifetimeDue = Math.max(0,
        (paymentsfound._sum.total_cost ?? 0) - (paymentsfound._sum.paid_amount ?? 0)
    );

    const payments = await prisma.payment.findMany({
        where: {
            project: { freelancerId: freelancerFound.id },
            payment_status: "PAID"
        },
        select: {
            paid_amount: true,
            createdAt: true
        }
    });

    const lifetimeEarned = payments.reduce((sum, p) => sum + p.paid_amount, 0);
    const now = new Date();
    const thisMonthEarned = payments.filter(p =>
        p.createdAt.getMonth() === now.getMonth() &&
        p.createdAt.getFullYear() === now.getFullYear()
    ).reduce((sum, p) => sum + p.paid_amount, 0);

    const projectscount = await prisma.project.count({
        where: { freelancerId: freelancerFound.id, status: { not: "COMPLETED" } }
    });

    return {
        success: true,
        stats: {
            due: lifetimeDue,
            activeprojects: projectscount,
            currentmonthearning: thisMonthEarned,
            lifetimeearning: lifetimeEarned
        }
    }
}