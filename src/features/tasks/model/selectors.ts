import { format, parseISO, startOfDay, subDays } from "date-fns";
import type {
  AnalyticsStats,
  DailyTaskCount,
  Task,
  TaskStatus,
} from "./types";

export function filterTasks(tasks: Task[], query: string): Task[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return tasks;
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(normalized) ||
      task.assignee.toLowerCase().includes(normalized),
  );
}

export function getTasksByStatus(
  tasks: Task[],
  status: TaskStatus,
  query: string,
): Task[] {
  return filterTasks(tasks, query).filter((task) => task.status === status);
}

export function computeAnalytics(tasks: Task[]): AnalyticsStats {
  const today = startOfDay(new Date());
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const overdue = tasks.filter((t) => {
    if (t.status === "done") return false;
    const due = startOfDay(parseISO(t.dueDate));
    return due < today;
  }).length;
  return { total, completed, overdue };
}

export function getTasksCreatedLast7Days(tasks: Task[]): DailyTaskCount[] {
  const today = startOfDay(new Date());
  const days: DailyTaskCount[] = [];

  for (let i = 6; i >= 0; i -= 1) {
    const day = subDays(today, i);
    const dateKey = format(day, "yyyy-MM-dd");
    const count = tasks.filter((task) => {
      const created = startOfDay(parseISO(task.createdAt));
      return format(created, "yyyy-MM-dd") === dateKey;
    }).length;
    days.push({
      date: dateKey,
      label: format(day, "MMM d"),
      count,
    });
  }

  return days;
}
