import { authClient } from "../lib/auth-client";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { data: session } = await authClient.getSession();

  if (session?.user.role === "FREELANCER") {
    redirect("/freelancer/dashboard");
  }

  if (session?.user.role === "CLIENT") {
    redirect("/client/dashboard");
  }
  redirect("/");
}
