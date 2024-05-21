import * as z from "zod";
import { Client } from "@notionhq/client";
export { type QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { env } from "~/env";

export const dealRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      const notionCredentials: { dbId: string; token: string } =
        (ctx.session.user.email === env.TEST_EMAIL_1 ||
          ctx.session.user.email === env.TEST_EMAIL_2) &&
        env.NOTION_DB_ID_1 &&
        env.NOTION_TOKEN_1
          ? { dbId: env.NOTION_DB_ID_1, token: env.NOTION_TOKEN_1 }
          : { dbId: env.NOTION_DB_ID, token: env.NOTION_TOKEN };

      const notion = new Client({ auth: notionCredentials.token });

      const response = (await notion.databases.query({
        database_id: notionCredentials.dbId,
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
  get: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    try {
      const notionCredentials: { dbId: string; token: string } =
        (ctx.session.user.email === env.TEST_EMAIL_1 ||
          ctx.session.user.email === env.TEST_EMAIL_2) &&
        env.NOTION_DB_ID_1 &&
        env.NOTION_TOKEN_1
          ? { dbId: env.NOTION_DB_ID_1, token: env.NOTION_TOKEN_1 }
          : { dbId: env.NOTION_DB_ID, token: env.NOTION_TOKEN };

      const notion = new Client({ auth: notionCredentials.token });

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
