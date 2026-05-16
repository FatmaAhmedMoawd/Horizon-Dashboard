import { NextResponse } from "next/server";
import { computeAnalytics, getTasksCreatedLast7Days } from "@/features/tasks/model/selectors";
import { SEED_TASKS } from "@/lib/seed-tasks";
import { apiDelay } from "@/lib/api-delay";
import type { Task } from "@/features/tasks/model/types";

export async function POST(request: Request): Promise<NextResponse> {
  await apiDelay(400);
  try {
    const body: unknown = await request.json();
    const tasks: Task[] =
      typeof body === "object" &&
      body !== null &&
      "tasks" in body &&
      Array.isArray((body as { tasks: unknown }).tasks)
        ? ((body as { tasks: Task[] }).tasks)
        : SEED_TASKS;
    return NextResponse.json({
      stats: computeAnalytics(tasks),
      chart: getTasksCreatedLast7Days(tasks),
    });
  } catch {
    return NextResponse.json({
      stats: computeAnalytics(SEED_TASKS),
      chart: getTasksCreatedLast7Days(SEED_TASKS),
    });
  }
}
