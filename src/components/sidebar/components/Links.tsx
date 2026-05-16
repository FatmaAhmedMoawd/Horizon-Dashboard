"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashIcon from "@/components/icons/DashIcon";
import type { NavRoute } from "@/config/navigation";

interface SidebarLinksProps {
  routes: NavRoute[];
}

export const SidebarLinks = ({ routes }: SidebarLinksProps) => {
  const pathname = usePathname();

  const activeRoute = (path: string) => pathname.startsWith(path);

  return (
    <>
      {routes.map((route) => {
        const isActive = activeRoute(route.path);
        return (
          <Link key={route.path} href={route.path}>
            <div
              className={`relative mb-1 flex cursor-pointer items-center rounded-xl px-4 py-2.5 transition-colors ${
                isActive
                  ? "bg-lightPrimary dark:bg-navy-700/80"
                  : "hover:bg-gray-50 dark:hover:bg-navy-700/40"
              }`}
            >
              <span
                className={
                  isActive
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {route.icon ?? <DashIcon />}
              </span>
              <p
                className={`ml-4 text-sm ${
                  isActive
                    ? "font-bold text-navy-700 dark:text-white"
                    : "font-medium text-gray-600 dark:text-gray-400"
                }`}
              >
                {route.name}
              </p>
              {isActive ? (
                <div className="absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-lg bg-brand-500 dark:bg-brand-400" />
              ) : null}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default SidebarLinks;
