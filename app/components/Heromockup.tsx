export function HeroMockup() {
  const stats = [
    { label: "Value", value: "₹45,000", accent: true },
    { label: "Received", value: "₹20,000", accent: false },
    { label: "Left", value: "₹25,000", accent: false },
  ];

  const milestones = [
    { title: "Auth System", amount: "₹8,000", status: "paid" },
    { title: "Dashboards", amount: "₹12,000", status: "paid" },
    { title: "Course Management", amount: "₹10,000", status: "pending" },
    { title: "Deployment & QA", amount: "₹7,000", status: "upcoming" },
  ] as const;

  return (
    // Outer browser frame
    <div className="border border-border bg-brand-surface overflow-hidden w-full">
      {/* ── Browser chrome bar ── */}
      <div className="bg-brand-surface2 border-b border-border px-3 py-2 flex items-center gap-1.5">
        <span className="w-[7px] h-[7px] rounded-full bg-border block" />
        <span className="w-[7px] h-[7px] rounded-full bg-border block" />
        <span className="w-[7px] h-[7px] rounded-full bg-border block" />
        <span className="font-mono py-2 text-[8px] text-white/80 tracking-wide ml-1.5">
          freelanceos.app / project / ADH7F29K
        </span>
      </div>

      {/* ── App body ── */}
      <div className="p-4">
        {/* Project title */}
        <p className="font-serif text-[14px] lg:text-lg text-ink mb-2.5">
          Your project Platform
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-brand-bg border border-border px-2 py-1.5"
            >
              <p className="font-mono text-[7px] lg:text-[10px] tracking-[1px] uppercase text-ink-dim mb-0.5">
                {s.label}
              </p>
              <p
                className={`font-mono text-[13px] lg:text-md ${s.accent ? "text-accent" : "text-ink"}`}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Thread label */}
        <p className="font-mono text-[7px] lg:text-sm tracking-[1.5px] uppercase text-ink-dim mb-2">
          Milestone Thread
        </p>

        {/* Milestone thread */}
        <div className="relative pl-5">
          {/* Vertical spine */}
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-border" />

          {milestones.map((ms, i) => (
            <div key={i} className="relative mb-2 last:mb-0">
              {/* Status dot */}
              <span
                className={[
                  "absolute -left-[15px] top-[12px] w-[10px] h-[10px] rounded-full border-[1.5px]",
                  ms.status === "paid"
                    ? "bg-[#2e7d52] border-[#2e7d52]"
                    : ms.status === "pending"
                      ? "bg-accent border-accent"
                      : "bg-transparent border-border-hover",
                ].join(" ")}
              />

              {/* Card */}
              <div className="bg-brand-bg border border-border px-2.5 py-4">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-sans text-[11px] lg:text-[14px] text-ink">
                    {ms.title}
                  </span>
                  <span className="font-mono text-[11px] lg:text-[14px] text-accent">
                    {ms.amount}
                  </span>
                </div>

                {/* Badge */}
                <span
                  className={[
                    "font-mono text-[6.5px] lg:text-[9px] tracking-[1px] uppercase px-1.5 py-0.5 border inline-block",
                    ms.status === "paid"
                      ? "text-[#5a9e75] border-[#2e5040]"
                      : ms.status === "pending"
                        ? "text-accent border-accent-dim/40"
                        : "text-ink-dim border-border",
                  ].join(" ")}
                >
                  {ms.status === "paid"
                    ? "PAID"
                    : ms.status === "pending"
                      ? "PENDING"
                      : "UPCOMING"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
