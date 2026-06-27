const ProjectCardSkeleton = () => (
  <section className="flex flex-col bg-dash-surface1 rounded-md border border-dash-border p-5 lg:p-4 overflow-hidden">
    <div className="flex justify-between">
      <div className="flex gap-3 items-start">
        <div className="mt-1 w-8 h-8 rounded-full bg-dash-surface3 animate-pulse shrink-0" />
        <div className="flex flex-col gap-1.5 mt-0.5">
          <div className="h-4 w-28 rounded bg-dash-surface3 animate-pulse" />
          <div className="h-2.5 w-20 rounded bg-dash-surface3 animate-pulse" />
        </div>
      </div>
      <div className="h-6 w-20 rounded-full bg-dash-surface3 animate-pulse self-start" />
    </div>

    <div className="flex justify-evenly my-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <div className="h-5 w-16 rounded bg-dash-surface3 animate-pulse" />
          <div className="h-2.5 w-12 rounded bg-dash-surface3 animate-pulse" />
        </div>
      ))}
    </div>

    <div className="mt-1.5 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="h-2.5 w-24 rounded bg-dash-surface3 animate-pulse" />
        <div className="h-2.5 w-16 rounded bg-dash-surface3 animate-pulse" />
      </div>
      <div className="h-1.5 w-full rounded-full bg-dash-surface3 animate-pulse" />
    </div>
  </section>
);

export default ProjectCardSkeleton;
