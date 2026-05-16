"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTaskSchema,
  type CreateTaskInput,
} from "../model/schemas";
import { ASSIGNEES } from "@/lib/constants";
import { useTaskStore } from "../store/task-store";

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function TaskFormModal({ open, onClose }: TaskFormModalProps) {
  const addTask = useTaskStore((s) => s.addTask);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      assignee: ASSIGNEES[0],
    },
  });

  if (!open) return null;

  const onSubmit = async (data: CreateTaskInput) => {
    try {
      await addTask(data);
      reset();
      onClose();
    } catch {
      // error handled in store
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div
        className="absolute inset-0"
        onClick={onClose}
        role="presentation"
      />
      <div className="relative z-10 w-full max-w-lg rounded-[20px] bg-white p-6 shadow-2xl dark:bg-navy-800">
        <h2 className="mb-6 text-xl font-bold text-navy-700 dark:text-white">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Title" error={errors.title?.message}>
            <input
              {...register("title")}
              className={inputClass(!!errors.title)}
              placeholder="Task title"
            />
          </Field>
          <Field label="Description" error={errors.description?.message}>
            <textarea
              {...register("description")}
              rows={3}
              className={inputClass(!!errors.description)}
              placeholder="Task description"
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Priority" error={errors.priority?.message}>
              <select
                {...register("priority")}
                className={inputClass(!!errors.priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </Field>
            <Field label="Due Date" error={errors.dueDate?.message}>
              <input
                type="date"
                {...register("dueDate")}
                className={inputClass(!!errors.dueDate)}
              />
            </Field>
          </div>
          <Field label="Assignee" error={errors.assignee?.message}>
            <select
              {...register("assignee")}
              className={inputClass(!!errors.assignee)}
            >
              {ASSIGNEES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-navy-700 dark:border-white/10 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-bold text-navy-700 dark:text-white">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

function inputClass(hasError: boolean): string {
  return `mt-1 w-full rounded-xl border bg-white/0 p-3 text-sm outline-none dark:text-white ${
    hasError
      ? "border-red-500"
      : "border-gray-200 dark:border-white/10"
  }`;
}
