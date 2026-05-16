"use client";

import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, parseISO } from "date-fns";
import type { Task, TaskPriority } from "../model/types";

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-green-50 text-green-600",
  medium: "bg-orange-50 text-orange-600",
  high: "bg-red-50 text-red-600",
};

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

function TaskCardComponent({ task, isOverlay = false }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "task", task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging && !isOverlay ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab rounded-[16px] border border-gray-200 bg-white p-4 shadow-sm active:cursor-grabbing dark:border-white/10 dark:bg-navy-800 ${
        isOverlay ? "shadow-xl ring-2 ring-brand-400" : ""
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-navy-700 dark:text-white">
          {task.title}
        </h4>
        <span
          className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>
      <p className="mb-3 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
        {task.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span className="font-medium text-brand-500">{task.assignee}</span>
        <span>Due {format(parseISO(task.dueDate), "MMM d")}</span>
      </div>
    </div>
  );
}

export const TaskCard = memo(TaskCardComponent);
