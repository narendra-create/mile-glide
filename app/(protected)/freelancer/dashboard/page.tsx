import FreelancerDashboard from "@/app/Features/Freelancer/Freelancer-dashboard";
import { Wallet, Users, Hourglass, Folder } from "lucide-react";
import { getDashboardStats } from "@/app/lib/Batch-Fetch/FreelancerDashboardStats";
import { loadMoreProjects } from "@/app/lib/actions/LoadMoreProjects";

const DashboardFreelancer = async () => {
  const result = await getDashboardStats();

  const loadmore = async (nextcursor: string) => {
    const result = await loadMoreProjects(nextcursor);
    if (!result.success) {
      console.log(result.error, result.status, "From loadmoreprojects");
      return [];
    }
    return result.projects ?? [];
  };

  if (!result.success) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <FreelancerDashboard loadmore={loadmore} data={result.data} />
    </>
  );
};

export default DashboardFreelancer;
