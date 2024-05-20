"use client";

import { toast } from "sonner";
import { useAtomValue } from "jotai";

import { api } from "~/trpc/react";
import { organizationIdAtom } from "~/state";
import { RoleIdType } from "~/lib/validationSchemas";

import { UserManagement } from "./(user-management)";
import { Visibility } from "./visibility";

export default function SettingsPage() {
  const organizationId = useAtomValue(organizationIdAtom);

  const organization = api.organization.get.useQuery(organizationId ?? "");

  const updateVisibility = api.organization.setVisibility.useMutation({
    onSuccess: () => {
      toast("Settings updated");
    },
    onError: () => toast.error("Failed to update settings"),
  });

  const user = api.user.get.useQuery();
  const showVisibility =
    user.data?.userRoles.find(
      (userRole) => userRole.organizationId === organizationId,
    )?.roleId === ("admin" as RoleIdType);

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Settings
      </h1>
      <UserManagement />
      {showVisibility && organizationId && organization.data ? (
        <Visibility
          defaultValues={{
            includeHiddenDeals: organization.data?.includeHiddenDeals,
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
