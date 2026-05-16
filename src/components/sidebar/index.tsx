"use client";

import { HiX } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Links from "./components/Links";
import { NAV_ROUTES } from "@/config/navigation";
import { APP_BADGE, APP_NAME } from "@/lib/brand";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <aside
      className={`fixed z-50 flex min-h-full w-[300px] flex-col border-r border-gray-100 bg-white pb-10 shadow-[4px_0_32px_rgba(112,144,176,0.12)] transition-transform duration-300 ease-out dark:border-white/5 dark:bg-navy-800 dark:shadow-[4px_0_32px_rgba(0,0,0,0.35)] xl:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
      } ${!open ? "xl:block" : ""}`}
    >
      <button
        type="button"
        className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-lightPrimary text-navy-700 transition hover:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600 xl:hidden"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <HiX className="h-5 w-5" />
      </button>

      <div className="px-8 pt-10 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-md shadow-brand-500/30">
            <MdDashboard className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="font-poppins text-[22px] font-bold leading-none text-navy-700 dark:text-white">
              {APP_NAME}
            </p>
            <span className="mt-1 inline-block rounded-md bg-brand-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-500 dark:bg-brand-400/15 dark:text-brand-400">
              {APP_BADGE}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-8 mb-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-white/20" />

      <ul className="mb-auto space-y-1 px-3">
        <Links routes={NAV_ROUTES} />
      </ul>

      <div className="mx-6 mt-6 rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-brand-600/5 p-4 dark:border-brand-400/20 dark:from-brand-500/15 dark:to-transparent">
        <p className="text-xs font-medium leading-relaxed text-gray-600 dark:text-gray-300">
          Manage tasks, track progress, and view analytics — all in one place.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
