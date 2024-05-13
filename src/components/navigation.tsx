"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  PaperclipIcon,
  AreaChartIcon,
  SettingsIcon,
  CircleHelpIcon,
  type LucideIcon,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";

const links: { icon: LucideIcon; title: string; href: string }[] = [
  { title: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { title: "Data", href: "/data", icon: PaperclipIcon },
  { title: "Analytics", href: "/activities", icon: AreaChartIcon },
  { title: "Settings", href: "/settings", icon: SettingsIcon },
  { title: "Help", href: "/help", icon: CircleHelpIcon },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn(
            "flex items-center rounded-md px-4 py-3 text-sm font-semibold",
            pathname === link.href
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100",
          )}
        >
          <link.icon className="mr-2 h-5 w-5" />
          <span>{link.title}</span>
        </Link>
      ))}
    </nav>
  );
}

export {
  Sheet as NavigationSheet,
  SheetContent as NavigationSheetContent,
  SheetTrigger as NavigationSheetTrigger,
};
