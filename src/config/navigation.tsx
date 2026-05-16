import type { ReactNode } from "react";
import { MdHome, MdViewKanban } from "react-icons/md";

export interface NavRoute {
  name: string;
  path: string;
  icon: ReactNode;
}

export const NAV_ROUTES: NavRoute[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: "Kanban",
    path: "/kanban",
    icon: <MdViewKanban className="h-6 w-6" />,
  },
];

export function getRouteName(pathname: string): string {
  const match = NAV_ROUTES.find((r) => pathname.startsWith(r.path));
  return match?.name ?? "Dashboard";
}
