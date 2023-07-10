export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Dashboards',
    items: [
      {
        name: 'Home',
        slug: 'layouts',
        description: '',
      },
      {
        name: 'Leaderboard',
        slug: 'route-groups',
        description: '',
      },
    ],
  },
  {
    name: 'Activities',
    items: [
      {
        name: 'Table',
        slug: 'loading',
        description: 'View the main list of activities for YourDAO',
      },
      {
        name: 'Filters',
        slug: 'error-handling',
        description: 'Create specific filters to get you the info you need',
      },
      {
        name: 'Comments',
        slug: 'error-handling',
        description: 'View the main comments for YourDAO',
      },
      {
        name: 'Not Found',
        slug: 'not-found',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      },
    ],
  },
  {
    name: 'Kanban',
    items: [
      {
        name: 'Relationships',
        slug: 'streaming',
        description:
          'Streaming data fetching from the server with React Suspense',
      },
      {
        name: 'Funnel',
        slug: 'ssg',
        description: 'View activities within a custom funnel',
      },
      {
        name: 'Team',
        slug: 'ssr',
        description: 'View activities within your Teams structure',
      },
      {
        name: 'Custom',
        slug: 'isr',
        description: 'Create a custom view of activities',
      },
    ],
  },
  {
    name: 'Data',
    items: [
      {
        name: 'JSON',
        slug: 'context',
        description: 'Export your data in JSON format',
      },
      {
        name: 'XML',
        slug: 'context',
        description: 'Export your data in XML format',
      },
    ],
  },
  {
    name: 'Admin',
    items: [
      {
        name: 'Moderator',
        slug: 'context',
        description: 'Define key parameters for your YourDAO data instance',
      },
    ],
  },
  {
    name: 'Settings',
    items: [
      {
        name: 'Misc',
        slug: 'hooks',
        description: 'Configure your YourDAO instance',
      },
      {
        name: 'Styling',
        slug: 'styling',
        description: 'Style your YourDAO instance',
      },
      {
        name: 'Code',
        slug: 'snippets',
        description: 'A collection of useful App Router code snippets',
      },
    ],
  },
];
