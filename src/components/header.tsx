"use client";

import { SearchIcon, BellIcon, MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { UserMenu } from "~/components/userMenu";
import { Button } from "~/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { NavigationSheetTrigger } from "~/components/navigation";

export function Header({ organizationId }: { organizationId: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const { status } = useSession();

  if (status !== "authenticated")
    return (
      <header className="fixed top-0 z-30 flex w-full items-center justify-between border-b bg-white px-4 py-2">
        <div className="mr-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">Ourmada</span>
          </div>
        </div>
      </header>
    );

  return (
    <>
      <header className="fixed top-0 z-30 flex w-full items-center justify-between border-b bg-white px-4 py-2">
        <div className="mr-4">
          <div className="hidden items-center gap-2 md:flex">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">Ourmada</span>
          </div>
          <NavigationSheetTrigger className="md:hidden">
            <MenuIcon className="h-4 w-4" />
          </NavigationSheetTrigger>
        </div>

        <div className="flex flex-grow items-center space-x-1 md:flex-grow-0">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="flex flex-grow items-center rounded-md border px-3 py-2"
          >
            <SearchIcon className="h-4 w-4 text-gray-500" />
            <div className="ml-2 flex-grow pr-4 text-sm text-gray-500 outline-none">
              Search...
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
          <Button size="icon" variant="ghost">
            <BellIcon className="h-5 w-5 text-gray-600" />
          </Button>

          <UserMenu organizationId={organizationId} />
        </div>
      </header>
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Pipeline</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
