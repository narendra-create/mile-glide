import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/app/lib/prisma";

export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized", status: 401 })
        };

        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        //Deleting Activities older then seven days
        const deletedActivities = await prisma.activity.deleteMany({
            where: {
                createdAt: {
                    lt: sevenDaysAgo
                }
            }
        });
        //Deleting Pending project that are older then 30 days and still unverified
        const deletedProjects = await prisma.project.deleteMany({
            where: {
                status: "PENDING",
                createdAt: { lt: thirtyDaysAgo }
            }
        });

        return NextResponse.json({
            success: true,
            deletedActivities: deletedActivities.count,
            deletedProjects: deletedProjects.count
        }, { status: 200 })
    }
    catch (error) {
        console.error("Cleanup cron failed", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}