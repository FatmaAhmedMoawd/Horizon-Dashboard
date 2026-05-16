"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { KANBAN_COLUMNS } from "@/lib/constants";
import { useDebouncedValue } from "@/lib/debounce";
import { getTasksByStatus } from "@/features/tasks/model/selectors";
import type { Task, TaskStatus } from "@/features/tasks/model/types";
import { useTaskStore } from "@/features/tasks/store/task-store";
import { TaskCard } from "@/features/tasks/ui/TaskCard";
import { KanbanColumn } from "./KanbanColumn";

function isTaskStatus(value: string): value is TaskStatus {
  return value === "todo" || value === "in_progress" || value === "done";
}

interface KanbanBoardProps {
  onEditTask?: (task: Task) => void;
}

export default function KanbanBoard({ onEditTask }: KanbanBoardProps) {
  const tasks = useTaskStore((s) => s.tasks);
  const filterQuery = useTaskStore((s) => s.filterQuery);
  const moveTask = useTaskStore((s) => s.moveTask);
  const debouncedQuery = useDebouncedValue(filterQuery, 300);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const columns = useMemo(
    () =>
      KANBAN_COLUMNS.map((col) => ({
        ...col,
        tasks: getTasksByStatus(tasks, col.id, debouncedQuery),
      })),
    [tasks, debouncedQuery],
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const task = tasks.find((t) => t.id === event.active.id);
      setActiveTask(task ?? null);
    },
    [tasks],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null);
      const { active, over } = event;
      if (!over) return;

      const taskId = String(active.id);
      const overId = String(over.id);

      let newStatus: TaskStatus | null = null;
      if (isTaskStatus(overId)) {
        newStatus = overId;
      } else {
        const overTask = tasks.find((t) => t.id === overId);
        if (overTask) newStatus = overTask.status;
      }

      if (!newStatus) return;
      const current = tasks.find((t) => t.id === taskId);
      if (!current || current.status === newStatus) return;
      void moveTask(taskId, newStatus);
    },
    [tasks, moveTask],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={col.tasks}
            onEditTask={onEditTask}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
}
