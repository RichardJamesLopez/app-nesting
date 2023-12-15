import clsx from 'clsx';
import Link from 'next/link';

export const TabNavItem = ({
  children,
  href,
  isActive,
}: {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={clsx('text-large rounded-lg px-3 py-1 font-medium', {
        ' bg-gray-300 text-blue-500 hover:bg-gray-500 hover:text-white':
          !isActive,
        'bg-vercel-blue text-white': isActive,
      })}
    >
      {children}
    </Link>
  );
};
