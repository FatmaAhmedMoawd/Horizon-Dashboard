"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer/Footer";
import { getRouteName } from "@/config/navigation";
import { useTaskStore } from "@/features/tasks/store/task-store";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const hydrate = useTaskStore((s) => s.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 1200) setOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const brandText = getRouteName(pathname);

  return (
    <div className="flex min-h-screen w-full">
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy-900/50 backdrop-blur-[2px] xl:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        />
      ) : null}
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main className="h-full flex-none transition-all px-6 max-sm:pl-[max(1.5rem,env(safe-area-inset-left))] max-sm:pr-[max(1.5rem,env(safe-area-inset-right))] sm:px-6 md:px-4 xl:ml-[313px] xl:px-3 xl:pr-2">
          <div className="h-full pt-6 sm:pt-8 md:pt-10 lg:pt-12">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={brandText}
            />
            <div className="mx-auto mb-auto min-h-[84vh] pb-4 pt-2">
              {children}
            </div>
            <div className="pb-6 pt-2">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
