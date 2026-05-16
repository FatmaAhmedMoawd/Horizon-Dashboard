"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement | null>,
  setOpen: (open: boolean) => void,
): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, setOpen]);
}

interface DropdownProps {
  button: ReactNode;
  children: ReactNode;
  classNames: string;
  animation?: string;
}

const Dropdown = ({ button, children, classNames, animation }: DropdownProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openWrapper, setOpenWrapper] = useState(false);
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onMouseDown={() => setOpenWrapper(!openWrapper)}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation ??
          "origin-top-right transition-all duration-300 ease-in-out"
        } ${openWrapper ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
