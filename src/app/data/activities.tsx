import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { DealRecordType } from "~/lib/dealRecordType";

export function Activities({ data }: { data?: DealRecordType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Deal Name</TableHead>
          <TableHead>Estimated Value</TableHead>
          <TableHead>Pipeline Status</TableHead>
          <TableHead>Last Edited</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map(({ id, properties }) => (
          <TableRow key={id}>
            <TableCell className="font-medium">
              {properties["Visibility"].select.name === "Show"
                ? properties["Name"].title[0]?.text.content
                : "---"}
            </TableCell>
            <TableCell>
              $
              {new Intl.NumberFormat("en-US").format(
                properties["Deal Value"].number,
              )}
            </TableCell>
            <TableCell>{properties["Status"].status.name}</TableCell>
            <TableCell>
              {format(
                new Date(properties["Last edited time"].last_edited_time),
                "MM/dd/yyyy, hh:mm aa",
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
