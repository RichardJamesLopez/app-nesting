"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Table2Icon, SettingsIcon, type LucideIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "~/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

const links: { icon: LucideIcon; title: string; route: string }[] = [
  { title: "Pipeline", route: "pipeline", icon: Table2Icon },
  { title: "Settings", route: "settings", icon: SettingsIcon },
];

export function Navigation({ organizationId }: { organizationId: string }) {
  const pathname = usePathname();

  const { status } = useSession();

  if (status !== "authenticated") return null;

  return (
    <nav className="space-y-2">
      {links.map((link) => {
        const href = `/${organizationId}/${link.route}`;

        return (
          <Link
            href={`/${organizationId}/${link.route}`}
            key={link.route}
            className={cn(
              "flex items-center rounded-md px-4 py-3 text-sm font-semibold",
              pathname.startsWith(href)
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            <link.icon className="mr-2 h-5 w-5" />
            <span>{link.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export {
  Sheet as NavigationSheet,
  SheetContent as NavigationSheetContent,
  SheetTrigger as NavigationSheetTrigger,
};
