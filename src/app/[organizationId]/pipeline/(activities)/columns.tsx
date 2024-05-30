"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDownIcon } from "lucide-react";
import Link from "next/link";

import { type DealType, type DealVisibility } from "~/server/api/routers/deal";
import { Button } from "~/components/ui/button";

type RowType = DealType & { organizationId: string };

export const columns: ColumnDef<RowType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Deal Name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value =
        row.original.visibility === ("Show" as DealVisibility)
          ? (row.getValue("name") as string)
          : "---";

      return (
        <Link
          href={`/${row.original.organizationId}/pipeline/${row.original.id}`}
        >
          <Button variant="link" size="sm" className="h-min">
            {value}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estimated Value
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      `$${new Intl.NumberFormat("en-US").format(row.getValue("value"))}`,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pipeline Status
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastEdited",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Edited
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      format(new Date(row.getValue("lastEdited")), "MM/dd/yyyy, hh:mm aa"),
  },
];
