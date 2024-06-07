import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { api } from "~/trpc/server";

import Thread from "./thread";
import { DealCard } from "~/components/dealCard";

export default async function CommentPage({
  params,
}: {
  params: { activityId: string; organizationId: string; commentId: string };
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
          <BreadcrumbLink
            href={`/${params.organizationId}/pipeline/${params.activityId}`}
          >
            Deal
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Comment</BreadcrumbPage>
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
          <Thread
            dealId={params.activityId}
            organizationId={params.organizationId}
            commentId={Number(params.commentId)}
          />
        </>
      ) : (
        <p>Deal not found.</p>
      )}
    </div>
  );
}
