"use client";

import { toast } from "sonner";

import { api } from "~/trpc/react";

import { UserManagement } from "./(user-management)";
import { Visibility } from "./visibility";

export default function SettingsPage({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const organization = api.organization.get.useQuery(organizationId);

  const updateVisibility = api.organization.setVisibility.useMutation({
    onSuccess: () => {
      toast("Settings updated");
    },
    onError: () => toast.error("Failed to update settings"),
  });

  const { data: isAdmin } = api.user.getIsAdmin.useQuery();

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Settings
      </h1>
      {isAdmin ? <UserManagement organizationId={organizationId} /> : null}
      {isAdmin && organization.data ? (
        <Visibility
          defaultValues={{
            includeHiddenDeals: organization.data.includeHiddenDeals,
          }}
          onSubmit={(values) =>
            updateVisibility.mutate({
              id: organizationId,
              form: values,
            })
          }
        />
      ) : null}
    </>
  );
}
