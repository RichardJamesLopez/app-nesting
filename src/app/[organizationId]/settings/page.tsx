"use client";

import { toast } from "sonner";

import { api } from "~/trpc/react";
import { RoleIdType } from "~/lib/validationSchemas";

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

  const user = api.user.get.useQuery();

  const isUserAdmin = user.data?.memberships
    .find((membership) => membership.organizationId === organizationId)
    ?.membershipRoles.map(({ roleId }) => roleId)
    .includes("admin" as RoleIdType);

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Settings
      </h1>
      <UserManagement organizationId={organizationId} />
      {isUserAdmin && organization.data ? (
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
