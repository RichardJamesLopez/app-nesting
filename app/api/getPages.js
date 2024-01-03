// /api/getPages.js
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (req, res) => {
  try {const databaseId = process.env.NOTION_DATABASE_ID;const response = await notion.databases.query({ database_id: databaseId });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};