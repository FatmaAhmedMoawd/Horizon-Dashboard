"use client";

import { useMemo } from "react";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Card from "@/components/card";
import { getTasksByPriorityCount } from "@/features/tasks/model/selectors";
import { useTaskStore } from "@/features/tasks/store/task-store";

const COLORS = {
  Low: "#01B574",    // Green
  Medium: "#FFCE20", // Yellow
  High: "#EE5D50",   // Red
};

export default function PriorityChart() {
  const tasks = useTaskStore((s) => s.tasks);
  const data = useMemo(() => getTasksByPriorityCount(tasks), [tasks]);

  return (
    <Card extra="rounded-[20px] p-6">
      <h3 className="mb-1 text-lg font-bold text-navy-700 dark:text-white">
        Tasks by Priority
      </h3>
      <p className="mb-6 text-sm text-gray-600">
        Count of tasks by priority level
      </p>
      <div className="h-[300px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={5}
              dataKey="count"
              nameKey="priority"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.priority as keyof typeof COLORS] || "#4318FF"} 
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 20px rgba(112, 144, 176, 0.15)",
              }}
              itemStyle={{ color: "#2B3674", fontWeight: "bold" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend below the chart */}
      <div className="mt-4 flex flex-row justify-center gap-6">
        {data.map((entry) => (
          <div key={entry.priority} className="flex items-center gap-2">
            <span 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: COLORS[entry.priority as keyof typeof COLORS] || "#4318FF" }}
            ></span>
            <span className="text-sm font-medium text-navy-700 dark:text-white">
              {entry.priority}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
