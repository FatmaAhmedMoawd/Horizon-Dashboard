import { API_DELAY_MS } from "./constants";

export async function apiDelay(ms: number = API_DELAY_MS): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
