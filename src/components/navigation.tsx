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
import Image from "next/image";

import { cn } from "~/lib/utils";

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
    <div className="flex h-screen w-48 flex-col gap-4 py-2">
      <div className="flex items-center gap-3 p-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={36}
          height={36}
          className="rounded-lg"
        />
        <span className="text-xl font-bold">Ourmada</span>
      </div>
      <nav>
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              "flex items-center gap-2 p-2 hover:bg-gray-200",
              pathname === link.href && "bg-gray-300",
            )}
          >
            <link.icon className="h-4 w-4" />
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
