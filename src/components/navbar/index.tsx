"use client";

import { useEffect, useState } from "react";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

interface NavbarProps {
  onOpenSidenav: () => void;
  brandText: string;
}

const Navbar = ({ onOpenSidenav, brandText }: NavbarProps) => {
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    setDarkmode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDark = () => {
    const next = !darkmode;
    setDarkmode(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="z-40 mb-6 flex w-full flex-col gap-4 sm:mb-8 sm:gap-5 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="ml-0 sm:ml-[6px]">
        <div className="pt-0.5">
          <span className="text-sm font-normal text-navy-700 dark:text-white">
            Pages /{" "}
          </span>
          <span className="text-sm font-normal capitalize text-navy-700 dark:text-white">
            {brandText}
          </span>
        </div>
        <h1 className="mt-1 text-[28px] font-bold capitalize leading-tight text-navy-700 dark:text-white sm:text-[33px]">
          {brandText}
        </h1>
      </div>

      <div className="flex h-[56px] w-full items-center justify-between gap-2 rounded-full border border-transparent bg-white px-3 py-2 shadow-xl shadow-shadow-500 dark:border-white/10 dark:!bg-navy-800 dark:shadow-none sm:h-[61px] sm:px-4 lg:max-w-[365px] lg:flex-grow-0 xl:w-[365px]">
        <div className="flex h-full min-w-0 flex-1 items-center rounded-full bg-lightPrimary text-navy-700 dark:!bg-navy-700 dark:text-white lg:max-w-[225px]">
          <span className="pl-2 pr-1 sm:pl-3 sm:pr-2">
            <FiSearch className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-300" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="navbar-search-input block h-full min-w-0 flex-1 rounded-full bg-transparent text-sm font-medium text-navy-700 outline-none placeholder:text-gray-400 dark:bg-transparent dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-full p-1.5 text-gray-600 transition hover:bg-lightPrimary dark:text-white dark:hover:bg-navy-700 xl:hidden"
            onClick={onOpenSidenav}
            aria-label="Open menu"
          >
            <FiAlignJustify className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex cursor-pointer items-center justify-center rounded-full p-1.5 text-gray-600 transition hover:bg-lightPrimary dark:text-white dark:hover:bg-navy-700"
            onClick={toggleDark}
            aria-label="Toggle dark mode"
          >
            {darkmode ? (
              <RiSunFill className="h-4 w-4" />
            ) : (
              <RiMoonFill className="h-4 w-4" />
            )}
          </button>
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm"
            aria-hidden
          >
            AP
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
