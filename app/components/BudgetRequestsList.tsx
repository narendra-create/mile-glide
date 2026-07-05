"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { BudgetRequestItem } from "@/types/budget";
import type { BudgetRequestStatus } from "@/app/generated/prisma/enums";
import { BudgetRequestCard } from "@/app/components/Cards/BudgetRequestCard";

// STATUS TABS
const STATUS_TABS: { label: string; value: BudgetRequestStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const TAB_STYLES: Record<
  BudgetRequestStatus | "ALL",
  { active: string; dot: string }
> = {
  ALL: {
    active:
      "border-[var(--color-dash-border-hover)] text-[var(--color-dash-ink2)] bg-[var(--color-dash-surface2)]",
    dot: "bg-[var(--color-dash-ink3)]",
  },
  PENDING: {
    active:
      "border-[rgba(200,169,110,0.4)] text-[var(--color-dash-gold)] bg-[rgba(200,169,110,0.06)]",
    dot: "bg-[var(--color-dash-gold)]",
  },
  APPROVED: {
    active:
      "border-[rgba(74,158,117,0.4)] text-[var(--color-dash-green)] bg-[rgba(74,158,117,0.06)]",
    dot: "bg-[var(--color-dash-green)]",
  },
  REJECTED: {
    active:
      "border-[rgba(192,96,96,0.4)] text-[var(--color-status-danger-text)] bg-[var(--color-status-danger-bg)]",
    dot: "bg-[var(--color-dash-red)]",
  },
};

// PROPS
interface BudgetRequestsListProps {
  budgetRequests: BudgetRequestItem[];
  role: "CLIENT" | "FREELANCER";
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  markReviewed?: (id: string) => void;
}

// UNIQUE PROJECTS FROM REQUESTS
function getUniqueProjects(requests: BudgetRequestItem[]) {
  const seen = new Set<string>();
  return requests
    .filter((r) => {
      if (seen.has(r.id.slice(0, 8) + r.project.title)) return false;
      seen.add(r.id.slice(0, 8) + r.project.title);
      return true;
    })
    .map((r) => ({ title: r.project.title }));
}

export function BudgetRequestsList({
  budgetRequests,
  role,
  onDelete,
  onApprove,
  onReject,
  markReviewed,
}: BudgetRequestsListProps) {
  const [activeStatus, setActiveStatus] = useState<BudgetRequestStatus | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // UNIQUE PROJECTS FOR FILTER
  const uniqueProjects = useMemo(
    () => getUniqueProjects(budgetRequests),
    [budgetRequests]
  );

  // FILTERED + SORTED REQUESTS
  const filtered = useMemo(() => {
    return budgetRequests
      .filter((r) => {
        const matchesStatus =
          activeStatus === "ALL" || r.status === activeStatus;
        const matchesSearch =
          searchQuery.trim() === "" ||
          r.project.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [budgetRequests, activeStatus, searchQuery]);

  // COUNTS PER STATUS
  const counts = useMemo(() => {
    return {
      ALL: budgetRequests.length,
      PENDING: budgetRequests.filter((r) => r.status === "PENDING").length,
      APPROVED: budgetRequests.filter((r) => r.status === "APPROVED").length,
      REJECTED: budgetRequests.filter((r) => r.status === "REJECTED").length,
    };
  }, [budgetRequests]);

  return (
    // PAGE CONTAINER
    <div className="w-full flex flex-col px-4 lg:px-6 py-6 lg:py-8">
      {/* HEADER */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-1.5 text-[var(--color-dash-ink3)] hover:text-white transition-colors duration-200 mb-5 font-mono text-[10px] tracking-[1.5px] uppercase"
        >
          <ArrowLeft size={12} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>
        <h1 className="font-serif text-[26px] lg:text-[30px] text-[var(--color-dash-gold)] leading-snug">
          Budget Requests
        </h1>
        <p className="font-mono text-[10px] tracking-[2px] uppercase text-[var(--color-dash-ink3)] mt-1">
          {counts.ALL} request{counts.ALL !== 1 ? "s" : ""} across{" "}
          {uniqueProjects.length} project{uniqueProjects.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="w-full h-px bg-[var(--color-dash-border)] mb-6" />

      {/* FILTERS ROW */}
      <div className="flex flex-col gap-3 mb-6 lg:flex-row lg:items-center lg:justify-between">
        {/* STATUS TABS */}
        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_TABS.map((tab) => {
            const isActive = activeStatus === tab.value;
            const styles = TAB_STYLES[tab.value];
            return (
              <button
                key={tab.value}
                onClick={() => setActiveStatus(tab.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[10px] tracking-[1.5px] uppercase transition-all duration-200 ${
                  isActive
                    ? styles.active
                    : "border-[var(--color-dash-border)] text-[var(--color-dash-ink3)] bg-transparent hover:border-[var(--color-dash-border-hover)] hover:text-[var(--color-dash-ink2)]"
                }`}
              >
                {tab.value !== "ALL" && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      isActive ? styles.dot : "bg-[var(--color-dash-ink4)]"
                    }`}
                  />
                )}
                {tab.label}
                <span
                  className={`font-mono text-[9px] px-1 py-px ${
                    isActive
                      ? "opacity-70"
                      : "text-[var(--color-dash-ink4)]"
                  }`}
                >
                  {counts[tab.value]}
                </span>
              </button>
            );
          })}
        </div>

        {/* SEARCH BY PROJECT TITLE */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-dash-surface2)] border border-[var(--color-dash-border)] focus-within:border-[var(--color-dash-border-hover)] transition-colors duration-200 w-full lg:w-64">
          <Search size={12} strokeWidth={2} className="text-[var(--color-dash-ink3)] shrink-0" />
          <input
            type="text"
            placeholder="Search by project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent font-sans text-[12px] text-white placeholder:text-[var(--color-dash-ink4)] focus:outline-none min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[var(--color-dash-ink3)] hover:text-white transition-colors duration-200"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE FILTER HINT */}
      {(activeStatus !== "ALL" || searchQuery) && (
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={10} strokeWidth={2} className="text-[var(--color-dash-ink3)]" />
          <p className="font-mono text-[9px] tracking-[1px] uppercase text-[var(--color-dash-ink3)]">
            Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            {activeStatus !== "ALL" && (
              <> · status: <span className="text-[var(--color-dash-ink2)]">{activeStatus}</span></>
            )}
            {searchQuery && (
              <> · project: <span className="text-[var(--color-dash-ink2)]">&quot;{searchQuery}&quot;</span></>
            )}
          </p>
        </div>
      )}

      {/* CARDS LIST */}
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((request, index) => (
              <BudgetRequestCard
                key={request.id}
                request={request}
                index={index}
                role={role}
                onDelete={onDelete}
                onApprove={onApprove}
                onReject={onReject}
                markReviewed={markReviewed}
              />
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center py-16 border border-dashed border-[var(--color-dash-border)]"
            >
              <p className="font-serif text-[16px] text-[var(--color-dash-ink3)] mb-2">
                No requests found
              </p>
              <p className="font-mono text-[10px] tracking-[1.5px] uppercase text-[var(--color-dash-ink4)]">
                {activeStatus !== "ALL"
                  ? `No ${activeStatus.toLowerCase()} requests`
                  : searchQuery
                    ? "Try a different project name"
                    : "All clear"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
