import React from "react";
import type { ClientDashboardProject } from "@/app/components/client/ClientActiveProjects";
import type { ClientDeadlineItem } from "@/app/components/client/ClientUpcomingDeadlines";
import type { ActivityItem } from "@/types/activitys";
import type { ClientDashboardData } from "@/app/Features/Client/Client-dashboard";

export const DUMMY_CLIENT_PROJECTS: ClientDashboardProject[] = [
  {
    id: "proj_c_001",
    title: "E-Commerce Platform Redesign",
    projectcode: "PRJ-001",
    status: "ACTIVE",
    agreedCost: 120000,
    deadline: "2026-09-15",
    freelancerName: "Arjun Mehta",
    freelancerInitials: "AM",
    freelancerCategory: "WEB_DEV",
    paid: 60000,
    remaining: 60000,
    milestones: [
      { id: "m1", title: "UI Wireframes & Prototype", milestonecost: 20000, status: "COMPLETED", position: 1 },
      { id: "m2", title: "Frontend Development", milestonecost: 40000, status: "IN_PROGRESS", position: 2 },
      { id: "m3", title: "Backend & API Integration", milestonecost: 35000, status: "NOT_STARTED", position: 3 },
      { id: "m4", title: "QA Testing & Launch", milestonecost: 25000, status: "NOT_STARTED", position: 4 },
    ],
  },
  {
    id: "proj_c_002",
    title: "Brand Identity Package",
    projectcode: "PRJ-002",
    status: "PENDING",
    agreedCost: 45000,
    deadline: "2026-08-01",
    freelancerName: "Priya Sharma",
    freelancerInitials: "PS",
    freelancerCategory: "GRAPHIC_DESIGNER",
    paid: 0,
    remaining: 45000,
    milestones: [
      { id: "m5", title: "Logo Design (3 concepts)", milestonecost: 15000, status: "NOT_STARTED", position: 1 },
      { id: "m6", title: "Brand Style Guide", milestonecost: 20000, status: "NOT_STARTED", position: 2 },
      { id: "m7", title: "Final Asset Delivery", milestonecost: 10000, status: "NOT_STARTED", position: 3 },
    ],
  },
  {
    id: "proj_c_003",
    title: "SEO Campaign Q3",
    projectcode: "PRJ-003",
    status: "ACTIVE",
    agreedCost: 30000,
    deadline: "2026-09-30",
    freelancerName: "Rahul Das",
    freelancerInitials: "RD",
    freelancerCategory: "SEO",
    paid: 15000,
    remaining: 15000,
    milestones: [
      { id: "m8", title: "Keyword Research & Audit", milestonecost: 8000, status: "COMPLETED", position: 1 },
      { id: "m9", title: "On-page Optimization", milestonecost: 12000, status: "IN_PROGRESS", position: 2 },
      { id: "m10", title: "Monthly Performance Report", milestonecost: 10000, status: "NOT_STARTED", position: 3 },
    ],
  },
];

export const DUMMY_CLIENT_DEADLINES: ClientDeadlineItem[] = [
  {
    id: "dl_1",
    projectTitle: "E-Commerce Platform Redesign",
    milestoneTitle: "Frontend Development",
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    cost: 40000,
  },
  {
    id: "dl_2",
    projectTitle: "Brand Identity Package",
    milestoneTitle: "Logo Design (3 concepts)",
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    cost: 15000,
  },
  {
    id: "dl_3",
    projectTitle: "SEO Campaign Q3",
    milestoneTitle: "On-page Optimization",
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    cost: 12000,
  },
  {
    id: "dl_4",
    projectTitle: "E-Commerce Platform Redesign",
    milestoneTitle: "Backend & API Integration",
    deadline: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
    cost: 35000,
  },
  {
    id: "dl_5",
    projectTitle: "SEO Campaign Q3",
    milestoneTitle: "Monthly Performance Report",
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    cost: 10000,
  },
];

export const DUMMY_CLIENT_ACTIVITY = [
  {
    id: 1,
    icon: "💳",
    iconColorClass: "bg-[#4a9e75]/[0.1]",
    text: (
      <>
        <strong className="font-medium text-[#c4bcb1]">Payment sent</strong>{" "}
        ₹60,000 to Arjun Mehta for Milestone 1
      </>
    ),
    time: "1 hour ago",
  },
  {
    id: 2,
    icon: "✅",
    iconColorClass: "bg-[#4a9e75]/[0.1]",
    text: (
      <>
        <strong className="font-medium text-[#c4bcb1]">Milestone completed</strong>{" "}
        — UI Wireframes on E-Commerce Platform
      </>
    ),
    time: "3 hours ago",
  },
  {
    id: 3,
    icon: "📋",
    iconColorClass: "bg-[#c8a96e]/[0.15]",
    text: (
      <>
        <strong className="font-medium text-[#c4bcb1]">New project accepted</strong>{" "}
        — Brand Identity Package by Priya Sharma
      </>
    ),
    time: "Yesterday · 11 AM",
  },
  {
    id: 4,
    icon: "⚑",
    iconColorClass: "bg-[#c87840]/[0.1]",
    text: (
      <>
        Freelancer raised a{" "}
        <strong className="font-medium text-[#c4bcb1]">budget request</strong> on
        SEO Campaign Q3
      </>
    ),
    time: "Yesterday · 4 PM",
  },
  {
    id: 5,
    icon: "🔔",
    iconColorClass: "bg-[#c8a96e]/[0.15]",
    text: (
      <>
        <strong className="font-medium text-[#c4bcb1]">Payment due</strong>{" "}
        for E-Commerce Platform — ₹60,000 remaining
      </>
    ),
    time: "2 days ago",
  },
  {
    id: 6,
    icon: "📌",
    iconColorClass: "bg-[#222222]",
    text: (
      <>
        <strong className="font-medium text-[#c4bcb1]">Milestone delayed</strong>{" "}
        — Frontend Development deadline extended
      </>
    ),
    time: "2 days ago",
  },
  {
    id: 7,
    icon: "💳",
    iconColorClass: "bg-[#4a9e75]/[0.1]",
    text: (
      <>
        <strong className="font-medium text-[#c4bcb1]">Payment verified</strong>{" "}
        — TXN9941207 confirmed by Rahul Das
      </>
    ),
    time: "3 days ago",
  },
  {
    id: 8,
    icon: "🔔",
    iconColorClass: "bg-[#c8a96e]/[0.15]",
    text: (
      <>
        <strong className="font-medium text-[#c4bcb1]">Reminder:</strong>{" "}
        Brand Identity deadline in 22 days
      </>
    ),
    time: "3 days ago",
  },
];

export const DUMMY_CLIENT_DASHBOARD: ClientDashboardData = {
  name: "Narendra",
  activeProjects: DUMMY_CLIENT_PROJECTS,
  deadlines: DUMMY_CLIENT_DEADLINES,
  activity: DUMMY_CLIENT_ACTIVITY as any as ActivityItem[],
  stats: {
    activeCount: 2,
    totalPaid: 75000,
    pendingAmount: 120000,
    pendingDueCount: 2,
    completedCount: 1,
  },
};
