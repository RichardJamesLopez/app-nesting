import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { notion } from "~/notion";

import { sortByProperty } from "~/lib/dealRecordType";
import { env } from "~/env";

export const dealRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    try {
      return await notion.databases.query({
        database_id: env.NOTION_DB_ID,
        sorts: [{ property: sortByProperty, direction: "ascending" }],
      });
    } catch (error) {
      console.error(error);
    }
  }),
});
