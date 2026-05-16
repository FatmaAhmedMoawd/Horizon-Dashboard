import { NextResponse } from "next/server";
import { createTaskSchema } from "@/features/tasks/model/schemas";
import { SEED_TASKS } from "@/lib/seed-tasks";
import { apiDelay } from "@/lib/api-delay";
import type { Task } from "@/features/tasks/model/types";

export async function GET(): Promise<NextResponse<Task[]>> {
  await apiDelay();
  return NextResponse.json(SEED_TASKS);
}

export async function POST(request: Request): Promise<NextResponse> {
  await apiDelay();
  try {
    const body: unknown = await request.json();
    const parsed = createTaskSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    const task: Task = {
      id: `task-${crypto.randomUUID()}`,
      ...parsed.data,
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(task, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
