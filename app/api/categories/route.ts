import type { Category } from './category';
//import NextAuth from 'next-auth';
//import GithubProvider from 'next-auth/providers/github';

//import { NextApiRequest, NextApiResponse } from 'next';
//import handleCors from '#/handleCors';

/*
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (handleCors(req, res)) {
    // If it was an OPTIONS request, we're done.
    return;
  }

  // Your existing logic for handling GET, POST, PUT, etc. requests goes here.
  if (req.method === 'GET') {
    // Handle GET request
  } else if (req.method === 'POST') {
    // Handle POST request
  }
  // And so on for other HTTP methods like DELETE, PUT, etc.
}
*/

export const runtime = 'edge';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // We sometimes artificially delay a reponse for demo purposes.
  // Don't do this in real life :)
  const delay = searchParams.get('delay');
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)));
  }

  const slug = searchParams.get('slug');
  if (slug) {
    const category = data.find((category) => category.slug === slug);

    return new Response(JSON.stringify(category ?? null), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  const parent = searchParams.get('parent');
  const categories = data.filter((category) =>
    parent ? category.parent === parent : category.parent === null,
  );

  return new Response(JSON.stringify(categories), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

const data: Category[] = [
  { name: 'Activities', slug: 'activities', count: 1, parent: null },
  { name: 'Updates', slug: 'updates', count: 4, parent: 'activities' },
  { name: 'New', slug: 'new', count: 1, parent: 'activities' },
  { name: 'Comments', slug: 'comments', count: 5, parent: 'activities' },
  { name: 'Deletions', slug: 'deletions', count: 2, parent: 'activities' },
  
];

/*
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
*/
