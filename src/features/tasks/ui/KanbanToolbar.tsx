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
      <div className="flex h-12 w-full items-center rounded-full bg-white px-4 shadow-sm dark:bg-navy-800 sm:max-w-md sm:flex-1">
        <FiSearch className="mr-2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter by title or assignee..."
          className="w-full bg-transparent text-sm text-navy-700 outline-none placeholder:text-gray-400 dark:text-white"
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
