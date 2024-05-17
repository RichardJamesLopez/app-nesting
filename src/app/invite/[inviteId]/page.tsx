"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { toast } from "sonner";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { organizationIdAtom } from "~/state";

export default function InvitePage({
  params,
}: {
  params: { inviteId: string };
}) {
  const { status } = useSession();
  const router = useRouter();
  const invite = api.invite.get.useQuery(params.inviteId);
  const organizations = api.organization.getAll.useQuery();
  const createMember = api.userRole.createMember.useMutation({
    onSuccess: () => {
      setOrganizationId(invite.data?.organizationId);
      organizations.refetch();
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error("Failed to join");
      console.error(error);
    },
  });

  const setOrganizationId = useSetAtom(organizationIdAtom);

  if (status === "loading") return "Loading";

  if (!invite.data) return null;

  const isInOrganization = organizations.data
    ?.map(({ id }) => id)
    .includes(invite.data.organizationId);

  if (isInOrganization && status === "authenticated") {
    setOrganizationId(invite.data.organizationId);
    router.push("/dashboard");

    return null;
  }

  return (
    <>
      <p>{invite.data.inviterName} invited you to join</p>
      <h1 className="mb-4 text-3xl">{invite.data.organizationName}</h1>
      {status === "authenticated" && (
        <Button onClick={() => createMember.mutate(params.inviteId)}>
          Accept invite
        </Button>
      )}
      {status === "unauthenticated" && (
        <Button
          onClick={() =>
            signIn("google", { callbackUrl: window.location.href })
          }
        >
          Sign in
        </Button>
      )}
    </>
  );
}
