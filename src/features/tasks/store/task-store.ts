"use client";

import { create } from "zustand";
import { createTaskApi, fetchTasks, moveTaskApi, updateTaskApi, deleteTaskApi } from "../api/tasks-api";
import type { CreateTaskInput } from "../model/schemas";
import type { Task, TaskStatus } from "../model/types";
import { loadTasksFromStorage, saveTasksToStorage } from "@/lib/storage";
import { SEED_TASKS } from "@/lib/seed-tasks";

interface TaskStoreState {
  tasks: Task[];
  filterQuery: string;
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;
  hydrate: () => Promise<void>;
  setFilterQuery: (query: string) => void;
  addTask: (input: CreateTaskInput) => Promise<void>;
  moveTask: (id: string, status: TaskStatus) => Promise<void>;
  updateTask: (id: string, input: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  clearError: () => void;
}

function persistTasks(tasks: Task[]): void {
  saveTasksToStorage(tasks);
}

function generateId(): string {
  return `task-${crypto.randomUUID()}`;
}

export const useTaskStore = create<TaskStoreState>((set, get) => ({
  tasks: [],
  filterQuery: "",
  isLoading: false,
  isHydrated: false,
  error: null,

  clearError: () => set({ error: null }),

  setFilterQuery: (query) => set({ filterQuery: query }),

  hydrate: async () => {
    if (get().isHydrated) return;
    set({ isLoading: true, error: null });
    try {
      const stored = loadTasksFromStorage();
      if (stored && stored.length > 0) {
        set({ tasks: stored, isHydrated: true, isLoading: false });
        return;
      }
      const fromApi = await fetchTasks();
      persistTasks(fromApi);
      set({ tasks: fromApi, isHydrated: true, isLoading: false });
    } catch {
      const fallback = loadTasksFromStorage() ?? SEED_TASKS;
      persistTasks(fallback);
      set({
        tasks: fallback,
        isHydrated: true,
        isLoading: false,
        error: "Could not reach API. Showing cached data.",
      });
    }
  },

  addTask: async (input) => {
    const optimistic: Task = {
      id: generateId(),
      ...input,
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    const previous = get().tasks;
    const next = [...previous, optimistic];
    set({ tasks: next, error: null });
    persistTasks(next);

    try {
      const created = await createTaskApi(input);
      const merged = next.map((t) => (t.id === optimistic.id ? created : t));
      set({ tasks: merged });
      persistTasks(merged);
    } catch (err) {
      set({
        tasks: previous,
        error: err instanceof Error ? err.message : "Failed to create task",
      });
      persistTasks(previous);
      throw err;
    }
  },

  moveTask: async (id, status) => {
    const previous = get().tasks;
    const next = previous.map((t) => (t.id === id ? { ...t, status } : t));
    set({ tasks: next, error: null });
    persistTasks(next);

    try {
      await moveTaskApi({ id, status });
    } catch (err) {
      set({
        tasks: previous,
        error: err instanceof Error ? err.message : "Failed to move task",
      });
      persistTasks(previous);
    }
  },

  updateTask: async (id, input) => {
    const previous = get().tasks;
    const next = previous.map((t) => (t.id === id ? { ...t, ...input } : t));
    set({ tasks: next, error: null });
    persistTasks(next);

    try {
      await updateTaskApi(id, input);
    } catch (err) {
      set({
        tasks: previous,
        error: err instanceof Error ? err.message : "Failed to update task",
      });
      persistTasks(previous);
      throw err;
    }
  },

  deleteTask: async (id) => {
    const previous = get().tasks;
    const next = previous.filter((t) => t.id !== id);
    set({ tasks: next, error: null });
    persistTasks(next);

    try {
      await deleteTaskApi(id);
    } catch (err) {
      set({
        tasks: previous,
        error: err instanceof Error ? err.message : "Failed to delete task",
      });
      persistTasks(previous);
    }
  },
}));
