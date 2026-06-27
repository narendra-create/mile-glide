import type { Categorys, Projectstatus } from "@/app/generated/prisma/enums";

// Freelancer profile
export type FreelancerDashboardProfile = {
  name: string;
  image: string | null;
  skill: Categorys | undefined;
};

// Money stats
export type FreelancerMoneyStats = {
  due: number;
  activeprojects: number;
  currentmonthearning: number;
  lifetimeearning: number;
  trendpercentage: number;
  pendingcount: number;
};

// Project client info
type ProjectClient = {
  user: {
    name: string;
    image: string | null;
  };
};

// Project money breakdown
type ProjectMoney = {
  totalAmount: number;
  received: number;
  remaining: number;
};

// Project milestone stats
type ProjectStats = {
  totalMilestones: number;
  completedMilestones: number;
  progress: number;
  projectDeadline: Date | undefined;
};

// Single project card
export type DashboardProject = {
  id: string;
  title: string;
  client: ProjectClient;
  money: ProjectMoney;
  status: Projectstatus;
  stats: ProjectStats;
};

export type LoadMoreProjectsResponse =
  | { success: true; projects: DashboardProject[]; nextcursor: string | null }
  | { success: false; error: string; status: number };

// Shape returned by the loadmore wrapper in page.tsx (always an array, errors handled internally)
export type LoadMoreResultItem = {
  id: string;
  title: string;
  client: {
    user: {
      name: string;
      image: string | null;
    };
  };
  money: {
    totalAmount: number;
    received: number;
    remaining: number;
  };
  status: Projectstatus;
  stats: {
    totalMilestones: number;
    completedMilestones: number;
    progress: number;
    projectDeadline: Date | undefined;
  };
};

export type LoadMoreResult = LoadMoreResultItem[];

// Full dashboard data (success response)
export type FreelancerDashboardData = {
  name: string;
  image: string | null;
  skill: Categorys | undefined;
  clientCount: number;
  ravenuechartdata: RevenueChartData;
  projects: DashboardProject[] | undefined;
  nextCursor: string | null | undefined;
  moneyStats: FreelancerMoneyStats;
};

// getDashboardStats return type
export type DashboardStatsResponse =
  | { success: true; data: FreelancerDashboardData }
  | { success: false; error: string; status: number };

// Revenue chart data
export type ChartDataPoint = {
  label: string;
  earned: number;
  paidOut: number;
  isCurrent?: boolean;
};

export type RevenueChartData = {
  monthly: ChartDataPoint[];
  weekly: ChartDataPoint[]
}
