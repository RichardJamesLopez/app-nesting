import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/server";

import Comments from "./comments";

export default async function ActivityPage({
  params,
}: {
  params: { activityId: string };
}) {
  const breadcrumb = (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/pipeline">Pipeline</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Deal</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  const deal = await api.deal.get(params.activityId);
  if (!deal) {
    return (
      <div className="mx-auto max-w-2xl">
        {breadcrumb}
        <p>Deal not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {deal.visibility === "Show" ? deal.name : "---"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label>Estimated Value</Label>
              <Input
                defaultValue={`$${new Intl.NumberFormat("en-US").format(deal.value)}`}
                disabled
              />
            </div>
            <div>
              <Label>Pipeline Status</Label>
              <Select disabled defaultValue={deal.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={deal.status}>{deal.status}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Last Edited</Label>
              <div className="px-2 py-3 text-sm text-muted-foreground">
                {format(new Date(deal.lastEdited), "MM/dd/yyyy, hh:mm aa")}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Comments dealId={params.activityId} />
    </div>
  );
}
