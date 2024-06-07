"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";

export default function InvitePage({
  params,
}: {
  params: { inviteId: string };
}) {
  const { status } = useSession();
  const router = useRouter();
  const invite = api.invite.get.useQuery(params.inviteId);
  const organizations = api.organization.getAll.useQuery();
  const createMembership = api.membership.create.useMutation({
    onSuccess: () => {
      organizations.refetch();
      router.push(`/${invite.data?.organizationId}/pipeline`);
    },
    onError: (error) => {
      toast.error("Failed to join");
      console.error(error);
    },
  });

  if (status === "loading") return "Loading";

  if (!invite.data) return null;

  const isInOrganization = organizations.data
    ?.map(({ id }) => id)
    .includes(invite.data.organizationId);

  if (isInOrganization && status === "authenticated") {
    router.push(`/${invite.data.organizationId}/pipeline`);

    return null;
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={36}
          height={36}
          className="rounded-lg"
        />
        <span className="text-xl font-bold">Ourmada</span>
      </div>
      <hr className="mb-6" />
      <p>{invite.data.inviterName} invited you to join</p>
      <h1 className="mb-4 text-3xl">{invite.data.organizationName}</h1>
      {status === "authenticated" && (
        <Button onClick={() => createMembership.mutate(params.inviteId)}>
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
