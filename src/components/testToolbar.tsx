import { VercelToolbar } from "@vercel/toolbar/next";
import { getServerAuthSession } from "~/server/auth";

export async function TestToolbar() {
  const session = await getServerAuthSession();

  return session ? <VercelToolbar /> : null;
}
