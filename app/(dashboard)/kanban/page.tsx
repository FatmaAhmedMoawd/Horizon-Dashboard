"use client";

import { useState } from "react";
import KanbanBoard from "@/features/kanban/ui/KanbanBoard";
import KanbanSkeleton from "@/features/kanban/ui/KanbanSkeleton";
import KanbanToolbar from "@/features/tasks/ui/KanbanToolbar";
import TaskFormModal from "@/features/tasks/ui/TaskFormModal";
import ErrorBanner from "@/components/ui/ErrorBanner";
import { useTaskStore } from "@/features/tasks/store/task-store";
import type { Task } from "@/features/tasks/model/types";

export default function KanbanPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const isLoading = useTaskStore((s) => s.isLoading);
  const isHydrated = useTaskStore((s) => s.isHydrated);
  const error = useTaskStore((s) => s.error);
  const clearError = useTaskStore((s) => s.clearError);
  const hydrate = useTaskStore((s) => s.hydrate);

  if (!isHydrated && isLoading) {
    return <KanbanSkeleton />;
  }

  return (
    <div>
      <ErrorBanner
        message={error ?? ""}
        onDismiss={clearError}
        onRetry={() => void hydrate()}
      />
      <KanbanToolbar onAddClick={() => {
        setEditingTask(null);
        setModalOpen(true);
      }} />
      <KanbanBoard onEditTask={(task) => {
        setEditingTask(task);
        setModalOpen(true);
      }} />
      <TaskFormModal 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialTask={editingTask} 
      />
    </div>
  );
}
