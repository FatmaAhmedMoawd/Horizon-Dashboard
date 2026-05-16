"use client";

import { useMemo } from "react";
import { MdBarChart, MdCheckCircle, MdWarning } from "react-icons/md";
import Widget from "@/components/widget/Widget";
import { computeAnalytics } from "@/features/tasks/model/selectors";
import { useTaskStore } from "@/features/tasks/store/task-store";

export default function StatWidgets() {
  const tasks = useTaskStore((s) => s.tasks);
  const stats = useMemo(() => computeAnalytics(tasks), [tasks]);

  return (
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-3">
      <Widget
        icon={<MdBarChart className="h-7 w-7" />}
        title="Total Tasks"
        subtitle={String(stats.total)}
      />
      <Widget
        icon={<MdCheckCircle className="h-7 w-7" />}
        title="Completed"
        subtitle={String(stats.completed)}
      />
      <Widget
        icon={<MdWarning className="h-7 w-7" />}
        title="Overdue"
        subtitle={String(stats.overdue)}
      />
    </div>
  );
}
