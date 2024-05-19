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

export default async function DataPage() {
  const deals = await api.deal.getAll();
  if (!deals) return null;

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
          <Activities data={deals} columns={columns} />
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
          <Summary data={deals} />
        </CardContent>
      </Card>
    </>
  );
}
