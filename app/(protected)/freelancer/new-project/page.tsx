import { NewProjectForm } from "@/app/components/NewProjectForm";
import { getFreelancerProfile } from "@/app/lib/controllers/profileController";
import { createNewProject } from "@/app/lib/controllers/ProjectController";
import { requireRole } from "@/app/lib/require-role";
import { newProjectSchema } from "@/app/lib/validations/ProjectValidation";
import type { newProjectInput } from "@/app/lib/validations/ProjectValidation";

export type NewProjectType = {
  title: string;
  agreedcost: string;
  deadline: string;
  description?: string;
};

const NewProject = () => {
  const createNew = async (form: NewProjectType) => {
    "use server";
    const { session, error } = await requireRole("freelancer");
    if (error) {
      alert(`Error creating project - ${error}`);
      return;
    }
    if (!session?.user) {
      alert("User is logged out");
      return;
    }
    const profile = await getFreelancerProfile(session?.user.email);
    if (!profile.profile?.Freelancer) {
      return alert("Can't Find freelancer account");
    }

    const payload: newProjectInput = {
      title: form.title,
      agreedcost: Number(form.agreedcost),
      deadline: new Date(form.deadline),
      description: form.description,
      freelancerId: profile.profile?.Freelancer?.id,
    };

    const parsed = newProjectSchema.parse(payload);
    const result = await createNewProject(parsed);
    if (!result.success) {
      alert(`Can't create project - ${result.status}, cause - ${result.error}`);
      return;
    }
    return { projectCode: result.projectCode };
  };

  return (
    <div className="lg:pl-11 lg:pt-14 mx-4">
      <NewProjectForm handleCreate={createNew} />
    </div>
  );
};

export default NewProject;
