import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { notion, type QueryDatabaseResponse } from "~/notion";

import { env } from "~/env";

export const dealRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    try {
      return (await notion.databases.query({
        database_id: env.NOTION_DB_ID,
        sorts: [{ property: sortingProperty, direction: "ascending" }],
      })) as unknown as DealResponse;
    } catch (error) {
      console.error(error);
    }
  }),
});

export type DealPropertyKey =
  | "Name"
  | "Deal Value"
  | "Status"
  | "Last edited time"
  | "Visibility";

type DealPropertiesType = {
  Name: {
    [key: string]: any;
    title: {
      [key: string]: any;
      text: {
        [key: string]: any;
        content: string;
      };
    }[];
  };

  "Deal Value": {
    [key: string]: any;
    number: number;
  };

  Status: {
    [key: string]: any;
    status: {
      [key: string]: any;
      name: DealStatus;
    };
  };

  "Last edited time": {
    [key: string]: any;
    last_edited_time: string;
  };

  Visibility: {
    [key: string]: any;
    select: {
      [key: string]: any;
      name: "Show" | "Custom Visibility";
    };
  };
};

export type DealStatus =
  | "Lead"
  | "Testing"
  | "Done"
  | "Reviewing"
  | "In development";

export type DealType = {
  [key: string]: any;
  id: string;
  created_time: string;
  properties: {
    [key: string]: any;
  } & {
    [key in DealPropertyKey]: DealPropertiesType[DealPropertyKey];
  };
};

type DealResponse = Omit<QueryDatabaseResponse, "results"> & {
  results: DealType[];
};

export const sortingProperty = "Name" as DealPropertyKey;
