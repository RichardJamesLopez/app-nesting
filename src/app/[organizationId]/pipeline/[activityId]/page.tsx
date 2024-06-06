import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { api } from "~/trpc/server";

import Comments from "./comments";
import { DealCard } from "~/components/dealCard";

export default async function ActivityPage({
  params,
}: {
  params: { activityId: string; organizationId: string };
}) {
  const breadcrumb = (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${params.organizationId}/pipeline`}>
            Pipeline
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Deal</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  const deal = await api.deal.get(params.activityId);

  return (
    <div className="mx-auto max-w-2xl">
      {breadcrumb}
      {deal ? (
        <>
          <DealCard {...deal} />
          <Comments
            dealId={params.activityId}
            organizationId={params.organizationId}
          />
        </>
      ) : (
        <p>Deal not found.</p>
      )}
    </div>
  );
}
