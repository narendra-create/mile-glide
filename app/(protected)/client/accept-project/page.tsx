import { AcceptProject } from "@/app/components/client/AcceptProject";
import {
  acceptProject,
  searchProject,
} from "@/app/lib/controllers/ProjectController";

const AcceptProjectpage = () => {
  const handleSearch = async (projectCode: string) => {
    "use server";
    const result = await searchProject(projectCode);
    if (!result.success) {
      return { error: `${result.error} - ${result.status}` };
    }
    return { project: result.project };
  };
  const handleAccept = async (projectCode: string) => {
    "use server";
    const result = await acceptProject(projectCode);
    if (!result.success) {
      return { error: `${result.error} - ${result.status}`, success: false };
    }
    return { data: result.Project?.id, success: true };
  };

  return (
    <div className="lg:pl-11 lg:pt-14 mx-4">
      <AcceptProject
        acceptProject={handleAccept}
        searchProject={handleSearch}
      />
    </div>
  );
};

export default AcceptProjectpage;
