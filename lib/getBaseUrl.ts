export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  } else if (process.env.PORT) {
    return `http://localhost:${process.env.PORT}`;
  } else {
    return 'http://localhost:3000';
  }
};
