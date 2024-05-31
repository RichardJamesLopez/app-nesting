import { Client } from "@notionhq/client";
export { type QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

import { env } from "~/env";

export const notion = new Client({ auth: env.NOTION_TOKEN });
