"use client";

import { FiSearch } from "react-icons/fi";
import { useTaskStore } from "../store/task-store";

interface KanbanToolbarProps {
  onAddClick: () => void;
}

export default function KanbanToolbar({ onAddClick }: KanbanToolbarProps) {
  const filterQuery = useTaskStore((s) => s.filterQuery);
  const setFilterQuery = useTaskStore((s) => s.setFilterQuery);

  return (
    <div className="mb-5 mt-2 flex w-full flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex h-12 w-full items-center rounded-full border border-transparent bg-white px-4 shadow-sm dark:border-white/10 dark:!bg-navy-800 sm:max-w-md sm:flex-1">
        <FiSearch className="mr-2 h-4 w-4 shrink-0 text-gray-400 dark:text-gray-300" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter by title or assignee..."
          className="navbar-search-input w-full bg-transparent text-sm text-navy-700 outline-none placeholder:text-gray-400 dark:bg-transparent dark:text-white dark:placeholder:text-gray-400"
        />
      </div>
      <button
        type="button"
        onClick={onAddClick}
        className="w-full rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600 sm:w-auto"
      >
        + Add Task
      </button>
    </div>
  );
}
