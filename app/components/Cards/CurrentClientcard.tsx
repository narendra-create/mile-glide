import React from "react";
import { ClientProgressBar } from "../Currentclientprogressbar";
import { AvatarInitials } from "../Initials";

export const CurrentClientcard = () => {
  return (
    <section className="flex flex-col bg-dash-surface1 rounded-md p-5">
      <div className="flex justify-between">
        <div className="flex gap-3 items-top">
          <div className="mt-1">
            <AvatarInitials initials="TN" variant="gold" />
          </div>
          <div className="flex flex-col">
            <h3>TechMart Inc.</h3>
            <p>E-COMMERCE PLATFORM</p>
          </div>
        </div>
        <div>• Active</div>
      </div>
      <div className="flex">
        <div className="flex items-center justify-center">
          <h3>₹85K</h3>
          <p>VALUE</p>
        </div>
        <div className="flex items-center justify-center">
          <h3>₹55K</h3>
          <p>RECEIVED</p>
        </div>
        <div className="flex items-center justify-center">
          <h3>₹30K</h3>
          <p>REMAINING</p>
        </div>
      </div>
      <div>
        <ClientProgressBar
          dueDate="22 June"
          milestonesCompleted={5}
          progress={50}
          totalMilestones={10}
          variant="gold"
        />
      </div>
    </section>
  );
};

export const Dummycard = () => {
  return (
    <section className="bg-dash-surface1 flex flex-col border border-dashed border-dash-border text-ink-muted h-full w-full items-center justify-center rounded-md p-5">
      <h3>+</h3>
      <h3>New Project</h3>
    </section>
  );
};
