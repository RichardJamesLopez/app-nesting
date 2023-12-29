export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const menus: { name: string; slug: string; icon: string }[] = [
  {
    name: 'Dashboard',
    slug: 'dashboard',
    icon: '/dashboard.svg',
  },
  {
    name: 'Activities',
    slug: 'activities',
    icon: '/activities.svg',
  },
  {
    name: 'Kanban',
    slug: 'kanban',
    icon: '/kanban.svg',
  },
  {
    name: 'Data',
    slug: 'data',
    icon: '/data.svg',
  },
  {
    name: 'Settings',
    slug: 'settings',
    icon: '/settings.svg',
  },
  {
    name: 'Help',
    slug: 'help',
    icon: '/help.svg',
  },
  /*{
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
        description: 'Define key parameters for your YourCompany data instance',
      },
    ],
  },
  {
    name: 'Settings',
    items: [
      {
        name: 'Misc',
        slug: 'hooks',
        description: 'Configure your YourCompany instance',
      },
      {
        name: 'Styling',
        slug: 'styling',
        description: 'Style your YourCompany instance',
      },
      {
        name: 'Code',
        slug: 'snippets',
        description: 'A collection of useful App Router code snippets',
      },
    ],
  },
   */
];

export const tabs: { name: string; slug: string }[] = [
  {
    name: 'Edit Profile',
    slug: 'edit-profile',
  },
  {
    name: 'Notifications',
    slug: 'notifications',
  },
  {
    name: 'Connected Addresses',
    slug: 'connected-addresses',
  },
  {
    name: 'Invite',
    slug: 'invite',
  },
  {
    name: 'Log Out',
    slug: 'logout',
  },
];
