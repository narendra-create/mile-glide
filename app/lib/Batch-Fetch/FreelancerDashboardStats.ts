import { getFreelancerProfile } from "../controllers/profileController";
import { getCurrentProjects, getClientStat, getMoneyStats, getRavnuechartStats } from "../controllers/clientController";
//getclientstat for getting number of clients serving or served, getprofile for getting freelancer id
import { requireRole } from "../require-role";
import type { DashboardStatsResponse } from "@/types/dashboard";

export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
    const { session, error, status } = await requireRole("freelancer");
    if (!session && error) {
        return {
            success: false,
            error: error,
            status: status
        }
    };

    const { profile } = await getFreelancerProfile(session?.user.email!);
    const freelancerId = profile?.Freelancer?.id;
    if (!freelancerId) {
        return { success: false, error: "Freelancer profile not found", status: 404 };
    };

    try {
        const [clientCount, projectsResult, moneyresult, ravenuedata] = await Promise.all([
            getClientStat(freelancerId),
            getCurrentProjects(freelancerId),
            getMoneyStats(freelancerId),
            getRavnuechartStats(freelancerId)
        ]);

        return {
            success: true,
            data: {
                name: profile.name,
                image: profile.image,
                skill: profile.Freelancer?.category,
                clientCount,
                moneyStats: {
                    activeprojects: moneyresult.stats?.activeprojects!,
                    currentmonthearning: moneyresult.stats?.currentmonthearning!,
                    due: moneyresult?.stats?.due!,
                    lifetimeearning: moneyresult?.stats?.lifetimeearning!,
                    trendpercentage: moneyresult?.stats?.trendpercentage!,
                    pendingcount: moneyresult?.stats?.pendingcount!
                },
                ravenuechartdata: {
                    monthly: ravenuedata.monthly!,
                    weekly: ravenuedata.weekly!
                },
                projects: projectsResult.success ? projectsResult.projects : [],
                nextCursor: projectsResult.success ? projectsResult.nextCursor : null,
            }
        }
    }
    catch (err) {
        console.error("Dashboard fetch failed:", err);
        return { success: false, error: "Failed to load dashboard", status: 500 };
    }
}