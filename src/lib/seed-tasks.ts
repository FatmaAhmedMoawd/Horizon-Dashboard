import { format, subDays } from "date-fns";
import type { Task } from "@/features/tasks/model/types";

function daysAgo(n: number): string {
  return subDays(new Date(), n).toISOString();
}

function dueIn(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return format(d, "yyyy-MM-dd");
}

export const SEED_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Design dashboard wireframes",
    description: "Create low-fidelity wireframes for the analytics page.",
    priority: "high",
    dueDate: dueIn(3),
    assignee: "Adela Parkson",
    status: "todo",
    createdAt: daysAgo(6),
  },
  {
    id: "task-2",
    title: "Implement Kanban drag and drop",
    description: "Use dnd-kit for column-based task movement.",
    priority: "high",
    dueDate: dueIn(1),
    assignee: "John Doe",
    status: "in_progress",
    createdAt: daysAgo(5),
  },
  {
    id: "task-3",
    title: "Set up Zustand store",
    description: "Configure task store with optimistic updates.",
    priority: "medium",
    dueDate: dueIn(-2),
    assignee: "Jane Smith",
    status: "in_progress",
    createdAt: daysAgo(4),
  },
  {
    id: "task-4",
    title: "Write API route handlers",
    description: "Mock endpoints with validation and simulated delay.",
    priority: "medium",
    dueDate: dueIn(5),
    assignee: "Mike Wilson",
    status: "done",
    createdAt: daysAgo(3),
  },
  {
    id: "task-5",
    title: "Add analytics chart",
    description: "Bar chart for tasks created in the last 7 days.",
    priority: "low",
    dueDate: dueIn(7),
    assignee: "Sarah Chen",
    status: "done",
    createdAt: daysAgo(2),
  },
  {
    id: "task-6",
    title: "Form validation with Zod",
    description: "Integrate React Hook Form with Zod resolver.",
    priority: "medium",
    dueDate: dueIn(2),
    assignee: "Adela Parkson",
    status: "todo",
    createdAt: daysAgo(1),
  },
  {
    id: "task-7",
    title: "Debounce search filter",
    description: "Filter tasks by title or assignee with 300ms debounce.",
    priority: "low",
    dueDate: dueIn(4),
    assignee: "John Doe",
    status: "todo",
    createdAt: daysAgo(0),
  },
];
