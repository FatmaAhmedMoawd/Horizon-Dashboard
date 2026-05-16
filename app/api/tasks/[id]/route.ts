import { NextResponse } from "next/server";
import { moveTaskSchema, updateTaskSchema } from "@/features/tasks/model/schemas";
import { SEED_TASKS } from "@/lib/seed-tasks";
import { apiDelay } from "@/lib/api-delay";
import type { Task } from "@/features/tasks/model/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: Request,
  { params }: RouteParams,
): Promise<NextResponse> {
  await apiDelay();
  const { id } = await params;
  try {
    const body: unknown = await request.json();
    const parsed = updateTaskSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const moveOnly = moveTaskSchema.safeParse({ id, ...parsed.data });
    const seed = SEED_TASKS.find((t) => t.id === id);
    const base: Task = seed ?? {
      id,
      title: "Task",
      description: "",
      priority: "medium",
      dueDate: new Date().toISOString().slice(0, 10),
      assignee: "Unknown",
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    const updated: Task = { ...base, ...parsed.data };
    if (moveOnly.success) {
      updated.status = moveOnly.data.status;
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
