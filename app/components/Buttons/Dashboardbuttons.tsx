import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
};

export function Primarydashboardbutton({ children, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-md transition-all ease-in-out duration-150 px-4 lg:w-54 text-[10px] lg:text-[14px] text-black bg-accent lg:px-4 py-2.5 border hover:bg-accent-dim focus:bg-accent-dim font-mono font-bold border-accent text-center"
    >
      {children}
    </Link>
  );
}

export function Seconddashboardbutton({ children, href }: ButtonProps) {
  return (
    <Link
      href={href}
      className="rounded-md transition-all ease-in-out duration-150 px-3 lg:w-36 text-[10px] lg:text-[13px] text-ink-dim bg-neutral-800 lg:px-4 py-2.5 border border-neutral-700/40 hover:bg-neutral-700 focus:bg-neutral-700 font-mono font-bold text-center"
    >
      {children}
    </Link>
  );
}
