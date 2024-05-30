import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { type DealType } from "~/server/api/routers/deal";

export function Summary({ data }: { data?: DealType[] }) {
  if (!data) return null;

  const totalCount = data.length;
  const totalDealValue = data.reduce((acc, { value }) => acc + value, 0);

  const statusGroupedDeals = data.reduce<{
    [status: string]: {
      count: number;
      totalDealValue: number;
    };
  }>((acc, { status, value }) => {
    if (!acc[status]) {
      acc[status] = { count: 0, totalDealValue: 0 };
    }

    acc[status]!.count += 1;
    acc[status]!.totalDealValue += value;

    return acc;
  }, {});
  const statusGroupedDealArray = Object.keys(statusGroupedDeals).map(
    (status) => ({
      status: status,
      count: statusGroupedDeals[status]?.count ?? NaN,
      totalDealValue: statusGroupedDeals[status]?.totalDealValue ?? NaN,
    }),
  );
  statusGroupedDealArray.sort((a, b) => Number(b.count) - Number(a.count));

  const visibilityGroupedDeals = data.reduce<{
    [visibility: string]: {
      count: number;
      totalDealValue: number;
    };
  }>((acc, { visibility, value }) => {
    if (!acc[visibility]) {
      acc[visibility] = { count: 0, totalDealValue: 0 };
    }

    acc[visibility]!.count += 1;
    acc[visibility]!.totalDealValue += value;

    return acc;
  }, {});
  const visibilityGroupedDealArray = Object.keys(visibilityGroupedDeals).map(
    (visibility) => ({
      visibility: visibility,
      count: visibilityGroupedDeals[visibility]?.count ?? NaN,
      totalDealValue: visibilityGroupedDeals[visibility]?.totalDealValue ?? NaN,
    }),
  );
  visibilityGroupedDealArray.sort((a, b) => Number(b.count) - Number(a.count));

  return (
    <Tabs defaultValue="total">
      <TabsList className="w-full">
        <TabsTrigger className="flex-grow" value="total">
          Total
        </TabsTrigger>
        <TabsTrigger className="flex-grow" value="status">
          Status
        </TabsTrigger>
        <TabsTrigger className="flex-grow" value="visibility">
          Visibility
        </TabsTrigger>
      </TabsList>
      <TabsContent value="total">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Total Count</TableHead>
              <TableHead>Total Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{totalCount}</TableCell>
              <TableCell>
                ${new Intl.NumberFormat("en-US").format(totalDealValue)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="status">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Total Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statusGroupedDealArray.map(({ status, count, totalDealValue }) => (
              <TableRow key={status}>
                <TableCell>{status}</TableCell>
                <TableCell>{count}</TableCell>
                <TableCell>
                  ${new Intl.NumberFormat("en-US").format(totalDealValue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="visibility">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visibility</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Total Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibilityGroupedDealArray.map(
              ({ visibility, count, totalDealValue }) => (
                <TableRow key={visibility}>
                  <TableCell>{visibility}</TableCell>
                  <TableCell>{count}</TableCell>
                  <TableCell>
                    ${new Intl.NumberFormat("en-US").format(totalDealValue)}
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
