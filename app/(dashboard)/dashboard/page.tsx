"use client";

import StatWidgets from "@/features/analytics/ui/StatWidgets";
import TasksChart from "@/features/analytics/ui/TasksChart";
import PriorityChart from "@/features/analytics/ui/PriorityChart";
import DashboardSkeleton from "@/features/analytics/ui/DashboardSkeleton";
import ErrorBanner from "@/components/ui/ErrorBanner";
import { useTaskStore } from "@/features/tasks/store/task-store";

export default function DashboardPage() {
  const isLoading = useTaskStore((s) => s.isLoading);
  const isHydrated = useTaskStore((s) => s.isHydrated);
  const error = useTaskStore((s) => s.error);
  const clearError = useTaskStore((s) => s.clearError);
  const hydrate = useTaskStore((s) => s.hydrate);

  if (!isHydrated && isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div>
      <ErrorBanner
        message={error ?? ""}
        onDismiss={clearError}
        onRetry={() => void hydrate()}
      />
      <StatWidgets />
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TasksChart />
        <PriorityChart />
      </div>
    </div>
  );
}
