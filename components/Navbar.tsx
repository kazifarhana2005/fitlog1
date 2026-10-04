"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
   import { usePlan } from "@/components/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  const linkClass = (href: string) =>
    `text-sm font-semibold transition-colors hover:text-[#c8f31d] ${
      pathname === href ? "text-[#c8f31d]" : "text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 navbar bg-[#0b0b0b] px-6 sm:px-10 min-h-16 border-b border-white/10">
      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c8f31d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6.5 6.5l11 11" />
            <path d="M21 21l-1-1" />
            <path d="M3 3l1 1" />
            <path d="M18 22l4-4" />
            <path d="M2 6l4-4" />
            <path d="M3 10l7-7" />
            <path d="M14 21l7-7" />
          </svg>
          <span className="text-lg font-extrabold tracking-wide text-white">
            FITLOG
          </span>
        </Link>
      </div>

      {/* Center links */}
      <nav className="navbar-center hidden sm:flex items-center gap-8">
        <Link href="/" className={linkClass("/")}>
          Workouts
        </Link>
        <Link href="/plan" className={linkClass("/plan")}>
          My Plan
        </Link>
      </nav>

      {/* Counters */}
      <div className="navbar-end gap-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <span>Plan</span>
          <span className="badge border-0 bg-[#c8f31d] font-bold text-black">
            {planCount}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <span>Saved</span>
          <span className="badge badge-outline border-white font-bold text-white">
            {savedCount}
          </span>
        </div>
      </div>
    </header>
  );
}