import ClientDashboard from "@/app/Features/Client/Client-dashboard";
import { DUMMY_CLIENT_DASHBOARD } from "@/app/components/seeds/ClientDashboardSeed";

const Dashboard = () => {
  return (
    <main>
      <ClientDashboard data={DUMMY_CLIENT_DASHBOARD} />
    </main>
  );
};

export default Dashboard;
