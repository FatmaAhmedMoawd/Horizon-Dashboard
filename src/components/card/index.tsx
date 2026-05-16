import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  extra?: string;
  children?: ReactNode;
}

function Card({ extra = "", children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-[10px] border border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
