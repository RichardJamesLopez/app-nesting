"use client";

import { useAtomValue } from "jotai";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { organizationIdAtom } from "~/state";

import { Activities, columns } from "./(activities)";
import { Summary } from "./summary";

export default function DataPage() {
  const organizationId = useAtomValue(organizationIdAtom);
  const deals = api.deal.getAll.useQuery();
  const organization = api.organization.get.useQuery(organizationId ?? "");

  if (!deals.data || !organization.data) return null;

  const dataWithoutHiddenDeals = deals.data.filter(
    ({ visibility }) => visibility !== "Hide",
  );

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
              organization.data.includeHiddenDeals
                ? deals.data
                : dataWithoutHiddenDeals
            }
          />
        </CardContent>
      </Card>
    </>
  );
}
