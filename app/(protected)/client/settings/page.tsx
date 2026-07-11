import { ClientSettings } from "@/app/components/client/ClientSettings";
import { getProfileAction } from "@/app/lib/actions/ProfileActions";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role.toLowerCase() !== "client") redirect("/unauthorized");

  const profileResponse = await getProfileAction();

  return (
    <div className="mx-4 lg:pl-7 lg:pt-10">
      <ClientSettings initialData={profileResponse.data} />
    </div>
  );
};

export default SettingsPage;
