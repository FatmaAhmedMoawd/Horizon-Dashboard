"use client";

import { memo, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "@/features/tasks/ui/TaskCard";
import type { Task, TaskStatus } from "@/features/tasks/model/types";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  onEditTask?: (task: Task) => void;
}

function KanbanColumnComponent({ id, title, tasks, onEditTask }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-[420px] flex-1 flex-col rounded-[20px] bg-white p-4 dark:bg-navy-800 ${
        isOver ? "ring-2 ring-brand-400" : ""
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-navy-700 dark:text-white">
          {title}
        </h3>
        <span className="rounded-full bg-lightPrimary px-3 py-1 text-xs font-bold text-brand-500 dark:bg-navy-900 dark:text-white">
          {tasks.length}
        </span>
      </div>
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-1 flex-col gap-3">
          {tasks.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No tasks in this column
            </p>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEditTask={onEditTask} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export const KanbanColumn = memo(KanbanColumnComponent);
