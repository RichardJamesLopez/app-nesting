import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { api } from "~/trpc/server";

import { Activities, columns } from "./(activities)";
import { Summary } from "./summary";

export default async function PipelinePage({
  params: { organizationId },
}: {
  params: { organizationId: string };
}) {
  const deals = await api.deal.getAll();
  const organization = await api.organization.get(organizationId ?? "");

  if (!deals || !organization) return null;

  const dataWithoutHiddenDeals = deals
    .filter(({ visibility }) => visibility !== "Hide")
    .map((deal) => ({ ...deal, organizationId }));

  return (
    <>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight first:mt-0">
        Selected Deals
      </h1>

      <Card className="mb-4">
        <CardHeader>
          <CardDescription>
            The following activities are selected deals that are visible to the
            community.
            <br />
            Click on the column headers to sort the data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Activities data={dataWithoutHiddenDeals} columns={columns} />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Pipeline Summary</CardTitle>
          <CardDescription>
            The following summaries are all deals aggregated and in an
            anonymized fashion.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Summary
            data={
              organization.includeHiddenDeals ? deals : dataWithoutHiddenDeals
            }
          />
        </CardContent>
      </Card>
    </>
  );
}
