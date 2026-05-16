"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "@/components/card";
import { getTasksCreatedLast7Days } from "@/features/tasks/model/selectors";
import { useTaskStore } from "@/features/tasks/store/task-store";

export default function TasksChart() {
  const tasks = useTaskStore((s) => s.tasks);
  const data = useMemo(() => getTasksCreatedLast7Days(tasks), [tasks]);

  return (
    <Card extra="rounded-[20px] p-6">
      <h3 className="mb-1 text-lg font-bold text-navy-700 dark:text-white">
        Tasks Created (Last 7 Days)
      </h3>
      <p className="mb-6 text-sm text-gray-600">
        Daily count of newly created tasks
      </p>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0E5F2" />
            <XAxis
              dataKey="label"
              tick={{ fill: "#A3AED0", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: "#A3AED0", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(112, 144, 176, 0.15)",
              }}
            />
            <Bar dataKey="count" fill="#7551FF" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
