"use client";

import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { format, parseISO } from "date-fns";
import { FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2 } from "react-icons/fi";
import { useTaskStore } from "../store/task-store";
import type { Task, TaskPriority, TaskStatus } from "../model/types";

const priorityStyles: Record<TaskPriority, string> = {
  low: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
  medium: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  high: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
};

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  onEditTask?: (task: Task) => void;
}

function TaskCardComponent({ task, isOverlay = false, onEditTask }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: "task", task } });

  const moveTask = useTaskStore((s) => s.moveTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this task?")) {
      void deleteTask(task.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditTask?.(task);
  };

  const handleMove = (direction: "left" | "right", e: React.MouseEvent) => {
    e.stopPropagation();
    const statuses: TaskStatus[] = ["todo", "in_progress", "done"];
    const currentIndex = statuses.indexOf(task.status);
    const nextIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex >= 0 && nextIndex < statuses.length) {
      void moveTask(task.id, statuses[nextIndex]);
    }
  };

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
        <div className="flex items-center gap-1.5">
          {!isOverlay && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleEdit}
                aria-label="Edit task"
                className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-brand-500 dark:bg-navy-700 dark:text-gray-300 dark:hover:bg-navy-600 dark:hover:text-brand-300"
              >
                <FiEdit2 className="h-3 w-3" />
              </button>
              <button
                onClick={handleDelete}
                aria-label="Delete task"
                className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500 dark:bg-navy-700 dark:text-gray-300 dark:hover:bg-red-500/20 dark:hover:text-red-400"
              >
                <FiTrash2 className="h-3 w-3" />
              </button>
            </div>
          )}
          <span
            className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-semibold capitalize ${priorityStyles[task.priority]}`}
          >
            {task.priority}
          </span>
        </div>
      </div>
      <p className="mb-3 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
        {task.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <div className="flex flex-col gap-1">
          <span className="font-medium text-brand-500 dark:text-brand-300">{task.assignee}</span>
          <span>Due {format(parseISO(task.dueDate), "MMM d")}</span>
        </div>
        
        {!isOverlay && (
          <div className="flex gap-1">
            <button
              onClick={(e) => handleMove("left", e)}
              disabled={task.status === "todo"}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-30 dark:bg-navy-700 dark:text-gray-300 dark:hover:bg-navy-600"
              aria-label="Move left"
            >
              <FiChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => handleMove("right", e)}
              disabled={task.status === "done"}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-30 dark:bg-navy-700 dark:text-gray-300 dark:hover:bg-navy-600"
              aria-label="Move right"
            >
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export const TaskCard = memo(TaskCardComponent);
