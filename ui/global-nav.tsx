'use client';

import { menus, type Item } from '#/lib/menus';
import Logo from '#/ui/logo';
import Link from 'next/link';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useState } from 'react';
import {
  useRouter,
  useSelectedLayoutSegment,
  usePathname,
} from 'next/navigation';
import Image from 'next/image';

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const pathname = usePathname();
  return (
    <div className="fixed top-0 z-10 flex w-full flex-col bg-white shadow-lg shadow-cyan-500/50 lg:bottom-0 lg:z-auto lg:w-56">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >
          <div className="h-10 w-10 rounded-full border border-white/30 group-hover:border-white/50">
            <Logo />
          </div>

          <h3 className="text-2xl	font-bold tracking-wide text-slate-800 group-hover:text-blue-800">
            Ourmada
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-slate-500 group-hover:text-slate-800">
          Menu
        </div>
        {isOpen ? (
          <XIcon className="block w-6 text-blue-700" />
        ) : (
          <MenuAlt2Icon className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-1 py-5 pl-2">
          {menus.map((section) => {
            return (
              <div key={section.name} className="flex justify-between">
                <div className="w-[93%] space-y-1">
                  <GlobalNavItem
                    key={section.slug}
                    section={section}
                    close={close}
                  />
                </div>
                <div
                  className={clsx({
                    'w-[3%] rounded-lg bg-[#F2994A]':
                      section.slug === pathname?.substring(1),
                  })}
                ></div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function GlobalNavItem({
  section,
  close,
}: {
  section: Item;
  close: () => false | void;
}) {
  const pathname = usePathname();
  const isActive = section.slug === pathname?.substring(1);
  const selected = isActive === true ? '-selected' : '';

  return (
    <Link
      onClick={close}
      href={`/${section.slug}`}
      className={clsx('flex rounded-md px-3 py-4 text-base font-medium ', {
        'text-slate-900 hover:bg-blue-400': !isActive,
        'bg-blue-500 text-white': isActive,
      })}
    >
      <Image
        src={`/${section.slug + selected}.svg`}
        alt={`${section.slug}-icon`}
        width={24}
        height={24}
      />
      <span className="pl-2">{section.name}</span>
    </Link>
  );
}
