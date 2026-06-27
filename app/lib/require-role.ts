import { auth } from "@/auth";
import { headers } from "next/headers";

export async function requireRole(...roles: string[]) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return { error: "Unauthorized", status: 401 };
    const lowercaserole = roles.map((r) => r.toLowerCase());
    if (!lowercaserole.includes(session.user.role.toLowerCase() ?? "")) return { error: "Forbidden", status: 403 };
    return { session };
}

//use this like :-
//const { session, error, status } = await requireRole("freelancer")
// if (error) {show error}
// session.user.freelancer.id or client.id is your freelancer or client.id — safe to use now