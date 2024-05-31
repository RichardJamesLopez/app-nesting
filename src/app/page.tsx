import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/api/auth/signin");

  const user = await api.user.get();
  if (!user) {
    console.error("User not found");
    return "Error";
  }

  if (!user.memberships[0]) return redirect("/new-organization");

  const { organizationId } = user.memberships.reduce(
    (last, x) => (x.lastSelectedAt > last.lastSelectedAt ? x : last),
    user.memberships[0],
  );
  redirect(`/${organizationId}/pipeline`);
}
