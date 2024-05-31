import { VercelToolbar } from "@vercel/toolbar/next";

import { getServerAuthSession } from "~/server/auth";
import { env } from "~/env";

export async function TestToolbar() {
  const session = await getServerAuthSession();

  return session && env.VERCEL_TOOLBAR ? <VercelToolbar /> : null;
}
