export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  assignee: string;
  status: TaskStatus;
  createdAt: string;
}

export interface TaskFilter {
  query: string;
}

export interface AnalyticsStats {
  total: number;
  completed: number;
  overdue: number;
}

export interface DailyTaskCount {
  date: string;
  label: string;
  count: number;
}

export interface PriorityTaskCount {
  priority: string;
  count: number;
}
