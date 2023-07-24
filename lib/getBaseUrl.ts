/*
import { cache } from 'react';

export const getBaseUrl = cache(() =>
  process.env.API_URL
    ? `${process.env.API_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`,
);
*/
//test

if (!process.env.API_URL) {
  throw new Error('Missing environment variable API_URL');
}

export const getBaseUrl = process.env.API_URL
  ? `${process.env.API_URL}`
  : `http://localhost:${process.env.PORT ?? 3000}`;
