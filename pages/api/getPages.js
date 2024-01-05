// /api/getPages.js

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req, res) => {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    let startCursor = undefined;
    let hasMore = true;
    let allData = [];

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor,
      });

      allData = [...allData, ...response.results];
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/* 
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req, res) => {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    let startCursor = undefined;
    let hasMore = true;
    let allData = [];

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: databaseId,
        start_cursor: startCursor,
      });

      allData = [...allData, ...response.results];
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    console.log('Row count:', allData.length); // Log the row count to the console

    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/

