import type { CreateTaskInput, MoveTaskInput } from "../model/schemas";
import type { Task, TaskStatus } from "../model/types";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => ({}));
    const message =
      typeof body === "object" &&
      body !== null &&
      "error" in body &&
      typeof (body as { error: unknown }).error === "string"
        ? (body as { error: string }).error
        : "Request failed";
    throw new Error(message);
  }
  return response.json() as Promise<T>;
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks");
  return parseJson<Task[]>(response);
}

export async function createTaskApi(input: CreateTaskInput): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseJson<Task>(response);
}

export async function updateTaskApi(
  id: string,
  data: Partial<Task> & { status?: TaskStatus },
): Promise<Task> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return parseJson<Task>(response);
}

export async function moveTaskApi(input: MoveTaskInput): Promise<Task> {
  return updateTaskApi(input.id, { status: input.status });
}

export async function deleteTaskApi(id: string): Promise<{ success: boolean }> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  return parseJson<{ success: boolean }>(response);
}
