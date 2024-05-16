"use client";

import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";

export default function InvitePage({
  params,
}: {
  params: { inviteId: string };
}) {
  const { status } = useSession();
  const user = api.user.get.useQuery();
  const createMember = api.userRole.createMember.useMutation({
    onSuccess: (organizationName) => {
      toast.success(`Welcome to ${organizationName}!`);
      redirect("/dashboard");
    },
    onError: (error) => {
      // toast.error("Failed to create a member");
      console.error(error);
    },
  });

  const isFreshUser =
    status === "authenticated" &&
    Number(new Date()) - Number(user.data?.createdAt) < 10000 &&
    !user.data?.userRoles.length;

  const [isDoneOnce, setIsDoneOnce] = useState<boolean>(false);
  useEffect(() => {
    if (status === "authenticated" && isFreshUser && !isDoneOnce) {
      setIsDoneOnce(true);
      setTimeout(() => {
        createMember.mutate(params.inviteId);
      }, 1000);
    }
  }, [
    createMember,
    isFreshUser,
    params.inviteId,
    status,
    setIsDoneOnce,
    isDoneOnce,
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
