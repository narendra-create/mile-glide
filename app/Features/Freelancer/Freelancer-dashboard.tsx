"use client";
import StatCardFreelancer from "@/app/components/Cards/StatCardFreelancer";
import { Folder, Hourglass, Users, Wallet } from "lucide-react";
import type { statcardprop } from "@/app/components/Cards/StatCardFreelancer";
import { motion } from "motion/react";
import {
  Primarydashboardbutton,
  Seconddashboardbutton,
} from "@/app/components/Buttons/Dashboardbuttons";
import TodayTasks from "@/app/components/FreelancerTodo";
import FreelancerActivity from "@/app/components/FreelancerActivity";
import {
  CurrentClientcard,
  Dummycard,
} from "@/app/components/Cards/CurrentClientcard";
import {
  fadeLeft,
  fadeUp,
  scaleIn,
  staggerContainer,
} from "@/app/lib/animations";
import RavenueChart from "@/app/components/FreelancerChart";
import type { ChartDataPoint } from "@/app/components/FreelancerChart";

const FreelancerDashboard = ({
  data,
}: {
  data: {
    monthlyData: ChartDataPoint[];
    weeklyData: ChartDataPoint[];
    stats: statcardprop[];
  };
}) => {
  const viewPort = {
    once: true,
    amount: 0.2,
  };
  return (
    <motion.main className="bg-brand-bg">
      <section className="mx-2 flex flex-col lg:flex-row gap-4 mb-6 lg:justify-between">
        <div className="mt-5 mx-2.5">
          <h4 className="hero-tag">FREELANCER DASHBOARD</h4>
          <div className="flex flex-col gap-0.5">
            <h1 className="font-serif text-2xl text-ink">Good Morning Dummy</h1>
            <h1 className="font-sans text-[13px] text-ink-muted">
              Friday, June 19 2026 • 3 Active projects
            </h1>
          </div>
        </div>
        <div className="flex lg:items-center lg:justify-center gap-3 max-w-68 lg:max-w-none ml-3">
          <Seconddashboardbutton href="/past-projects">
            Past projects
          </Seconddashboardbutton>
          <Primarydashboardbutton href="/freelancer/new-project">
            + Create New Project
          </Primarydashboardbutton>
        </div>
      </section>
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-2 my-2 lg:my-4 grid grid-cols-2 lg:grid-cols-4 gap-2"
      >
        {data.stats &&
          data.stats.map((item, i) => {
            return (
              <motion.div variants={scaleIn} key={i}>
                <StatCardFreelancer prop={item} />
              </motion.div>
            );
          })}
      </motion.section>
      <motion.section
        variants={staggerContainer}
        whileInView="show"
        initial="hidden"
        viewport={viewPort}
        className="my-5 mx-2 flex flex-col lg:flex-row gap-2 pb-4"
      >
        <motion.div
          variants={fadeUp}
          whileInView="show"
          initial="hidden"
          viewport={viewPort}
          className="lg:w-[75%]"
        >
          <RavenueChart
            monthlyData={data.monthlyData}
            weeklyData={data.weeklyData}
          />
        </motion.div>
        <motion.div
          variants={fadeLeft}
          whileInView="show"
          initial="hidden"
          viewport={viewPort}
          className="lg:w-[25%] lg:h-89 overflow-y-auto custom-scrollbar"
        >
          <TodayTasks />
        </motion.div>
      </motion.section>
      <motion.section
        whileInView="show"
        viewport={viewPort}
        initial="hidden"
        variants={staggerContainer}
        className="flex flex-col lg:flex-row justify-center gap-3 mx-2 mt-2 mb-18"
      >
        <div className="lg:w-[75%]">
          <div className="flex justify-between pr-4 pl-2 mb-3 items-center">
            <h3 className="text-md lg:text-lg font-serif text-ink flex items-center">
              Active clients
            </h3>
            <h4 className="text-ink text-[11px] flex items-center">
              View all →
            </h4>
          </div>
          <motion.div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            {[1, 2, 3, 4].map((item) => {
              return (
                <motion.div variants={scaleIn} key={item}>
                  <CurrentClientcard />
                </motion.div>
              );
            })}
            <div className="w-full h-43">
              <Dummycard />
            </div>
          </motion.div>
        </div>
        <motion.div variants={fadeLeft} className="lg:w-[25%] mt-1">
          <FreelancerActivity />
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

export default FreelancerDashboard;
