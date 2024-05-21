import * as z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { notion, type QueryDatabaseResponse } from "~/notion";

import { env } from "~/env";

export const dealRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    try {
      const response = (await notion.databases.query({
        database_id: env.NOTION_DB_ID,
        sorts: [
          {
            property: "Name" as DealResponsePropertyKey,
            direction: "ascending",
          },
        ],
      })) as unknown as DealResponseType;

      return response.results.map((item) => ({
        id: item.id,
        name: item.properties.Name.title[0].text.content,
        value: item.properties["Deal Value"].number,
        status: item.properties.Status.status.name,
        lastEdited: item.properties["Last edited time"].last_edited_time,
        visibility: item.properties.Visibility.select.name,
      })) as DealType[];
    } catch (error) {
      console.error(error);
    }
  }),
  get: protectedProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const response = (await notion.pages.retrieve({
        page_id: input,
      })) as unknown as {
        [key: string]: any;
        properties: DealResponsePropertiesType;
      };

      return {
        id: response.id,
        name: response.properties.Name.title[0]?.text.content,
        value: response.properties["Deal Value"].number,
        status: response.properties.Status.status.name,
        lastEdited: response.properties["Last edited time"].last_edited_time,
        visibility: response.properties.Visibility.select.name,
      };
    } catch (error) {
      console.error(error);
    }
  }),
});

type DealStatus = "Lead" | "In development" | "Reviewing" | "Testing" | "Done";
export type DealVisibility = "Show" | "Custom Visibility" | "Hide";
type DealResponsePropertyKey =
  | "Name"
  | "Deal Value"
  | "Status"
  | "Last edited time"
  | "Visibility";

type DealResponsePropertiesType = {
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
      name: DealVisibility;
    };
  };
};

type DealResponseType = Omit<QueryDatabaseResponse, "results"> & {
  results: {
    [key: string]: any;
    id: string;
    created_time: string;
    properties: {
      [key: string]: any;
    } & {
      [key in DealResponsePropertyKey]: DealResponsePropertiesType[DealResponsePropertyKey];
    };
  }[];
};

export type DealType = {
  id: string;
  name: string;
  value: number;
  status: DealStatus;
  lastEdited: string;
  visibility: DealVisibility;
};
