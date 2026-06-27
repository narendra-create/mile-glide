import { PastProjects } from "@/app/components/PastProjects";

const PastProjectsPage = () => {
  const dummyPastProjects = [
    {
      id: "proj_1",
      title: "V The-Farmer Platform",
      clientName: "AgriTech Solutions",
      freelancerName: "John Doe",
      paymentStatus: "PAID" as const,
      completionDate: "12 Oct 2025",
      cost: 28000,
    },
    {
      id: "proj_2",
      title: "E-Commerce Dashboard UI",
      clientName: "Retail Corp",
      freelancerName: "Jane Smith",
      paymentStatus: "DUE" as const,
      completionDate: new Date("2025-09-28"),
      cost: 45000,
    },
    {
      id: "proj_3",
      title: "SEO Audit & Optimization",
      clientName: "Local Bakery",
      freelancerName: "Mike Johnson",
      paymentStatus: "PENDING_VERIFICATION" as const,
      completionDate: "05 Aug 2025",
      cost: 15500,
    },
    {
      id: "proj_4",
      title: "Mobile App Wireframing",
      clientName: "Startup Inc.",
      freelancerName: "Sarah Williams",
      paymentStatus: "PAID" as const,
      completionDate: new Date("2025-07-14"),
      cost: 32000,
    },
  ];

  return (
    <div className="mx-4 lg:pl-7 lg:pt-10">
      <PastProjects role="freelancer" projects={dummyPastProjects} />
    </div>
  );
};

export default PastProjectsPage;
