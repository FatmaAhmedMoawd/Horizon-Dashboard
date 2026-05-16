import type { TaskStatus } from "@/features/tasks/model/types";

export const STORAGE_KEY = "horizon-tasks-v1";

export const ASSIGNEES = [
  "Adela Parkson",
  "John Doe",
  "Jane Smith",
  "Mike Wilson",
  "Sarah Chen",
] as const;

export const KANBAN_COLUMNS: {
  id: TaskStatus;
  title: string;
}[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

export const API_DELAY_MS = 800;
