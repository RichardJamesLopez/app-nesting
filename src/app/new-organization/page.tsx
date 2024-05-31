"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import { api } from "~/trpc/react";
import { OrganizationForm } from "~/components/organizationForm";

export default function NewOrganizationPage() {
  const router = useRouter();

  const organizations = api.organization.getAll.useQuery();

  const createOrganization = api.organization.create.useMutation({
    onSuccess: (newOrganizationId) => {
      organizations.refetch();
      toast("Organization created");
      router.push(`/${newOrganizationId}/pipeline`);
    },
    onError: () => {
      toast.error("Failed to create an organization");
    },
  });

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
      <h1 className="mb-8 text-3xl">Welcome!</h1>
      <OrganizationForm onSubmit={createOrganization.mutate} />
    </>
  );
}
