"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";

export default function InvitePage({
  params,
}: {
  params: { inviteId: string };
}) {
  const { status } = useSession();
  const router = useRouter();
  const user = api.user.get.useQuery();
  const organizations = api.organization.getAll.useQuery();
  const createMember = api.userRole.createMember.useMutation({
    onSuccess: () => {
      organizations.refetch();
      router.push("/dashboard");
    },
    onError: (error) => {
      // toast.error("Failed to create a member");
      console.error(error);
    },
  });

  const [isDoneOnce, setIsDoneOnce] = useState<boolean>(false);
  useEffect(() => {
    const isFreshUser =
      status === "authenticated" &&
      Number(new Date()) - Number(user.data?.createdAt) < 10000 &&
      !user.data?.userRoles.length;

    if (status === "authenticated" && isFreshUser && !isDoneOnce) {
      createMember.mutate(params.inviteId);
      setIsDoneOnce(true);
    }
  }, [
    createMember,
    params.inviteId,
    status,
    setIsDoneOnce,
    isDoneOnce,
    user.data?.createdAt,
    user.data?.userRoles.length,
  ]);

  return status === "unauthenticated" ? (
    <>
      <h1 className="mb-4 text-3xl font-thin">You are invited</h1>
      <Button
        onClick={() =>
          signIn("google", {
            callbackUrl: `${window.location.origin}/invite/${params.inviteId}`,
          })
        }
      >
        Join
      </Button>
    </>
  ) : null;
}
