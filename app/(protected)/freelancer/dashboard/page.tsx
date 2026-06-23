import FreelancerDashboard from "@/app/Features/Freelancer/Freelancer-dashboard";
import type { ChartDataPoint } from "@/app/components/FreelancerChart";
import type { statcardprop } from "@/app/components/Cards/StatCardFreelancer";
import { Wallet, Users, Hourglass, Folder } from "lucide-react";

const DashboardFreelancer = () => {
  const monthlyData: ChartDataPoint[] = [
    { label: "Jan", earned: 92000, paidOut: 60000 },
    { label: "Feb", earned: 110000, paidOut: 76000 },
    { label: "Mar", earned: 128000, paidOut: 90000 },
    { label: "Apr", earned: 144000, paidOut: 104000 },
    { label: "May", earned: 162000, paidOut: 116000 },
    { label: "Jun", earned: 184200, paidOut: 120000, isCurrent: true },
    { label: "Jul", earned: 150000, paidOut: 110000 },
    { label: "Aug", earned: 175000, paidOut: 130000 },
    { label: "Sep", earned: 190000, paidOut: 140000 },
    { label: "Oct", earned: 210000, paidOut: 150000 },
    { label: "Nov", earned: 230000, paidOut: 170000 },
    { label: "Dec", earned: 250000, paidOut: 180000 },
  ];
  const weeklyData: ChartDataPoint[] = [
    { label: "Week 1", earned: 45000, paidOut: 30000 },
    { label: "Week 2", earned: 52000, paidOut: 35000 },
    { label: "Week 3", earned: 48000, paidOut: 32000 },
    { label: "Week 4", earned: 60000, paidOut: 40000, isCurrent: true },
  ];

  const stats: statcardprop[] = [
    {
      icon: Wallet,
      statnumber: "₹1,84,000",
      supporttext1: "Total Earnings",
      supporttext2: "- June",
      trendtext: "↑ 12.5%",
      trendtype: "MONEY",
    },
    {
      icon: Users,
      statnumber: "24",
      supporttext1: "Clients Served",
      trendtype: "NEUTRAL",
      trendtext: "All time",
    },
    {
      icon: Hourglass,
      statnumber: "₹68,000",
      supporttext1: "Payment Remaining",
      trendtype: "WARNING",
      trendtext: "2 Pending",
    },
    {
      icon: Folder,
      statnumber: "3",
      supporttext1: "Active Projects",
      trendtype: "SUCCESS",
      trendtext: "2 New",
    },
  ];

  const data = {
    monthlyData,
    weeklyData,
    stats,
  };

  return (
    <>
      <FreelancerDashboard data={data} />
    </>
  );
};

export default DashboardFreelancer;
