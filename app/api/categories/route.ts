import type { Category } from './category';

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
  { name: 'Comments', slug: 'comments', count: 5, parent: 'activities' },
  { name: 'Deletions', slug: 'deletions', count: 2, parent: 'activities' },
  { name: 'New', slug: 'new', count: 1, parent: 'activities' },
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
