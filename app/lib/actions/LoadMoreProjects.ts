"use server";
import { getCurrentProjects } from "../controllers/clientController";
import { requireRole } from "../require-role";
import { getFreelancerProfile } from "../controllers/profileController";

export const loadMoreProjects = async (nextcursor: string) => {
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
        const result = await getCurrentProjects(freelancerId, nextcursor);
        if (!result.success) {
            return {
                success: false,
                error: result.error,
                status: result.status
            }
        };

        return {
            success: true,
            projects: result.projects,
            nextcursor: result.nextCursor
        }
    }
    catch (err) {
        console.error("More projects fetch failed:", err);
        return { success: false, error: "Failed to load projects", status: 500 };
    }
}