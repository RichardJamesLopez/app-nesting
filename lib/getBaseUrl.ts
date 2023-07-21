import { cache } from 'react';

export const getBaseUrl = cache(() =>
  process.env.REACT_APP_API_URL
    ? `process.env.REACT_APP_API_URL`
    : `http://localhost:${process.env.PORT ?? 3000}`,
);
