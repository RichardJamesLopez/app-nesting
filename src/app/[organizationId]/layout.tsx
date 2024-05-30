import Image from "next/image";

import "~/styles/globals.css";
import {
  Navigation,
  NavigationSheet,
  NavigationSheetContent,
} from "~/components/navigation";
import { Header } from "~/components/header";

export default function RootLayout({
  children,
  params: { organizationId },
}: {
  children: React.ReactNode;
  params: { organizationId: string };
}) {
  return (
    <>
      <NavigationSheet>
        <Header organizationId={organizationId} />
        <div className="fixed z-10 hidden h-screen w-56 flex-col gap-4 bg-white p-2 pt-20 md:block">
          <Navigation organizationId={organizationId} />
        </div>
        <NavigationSheetContent
          side="left"
          className="max-w-56 p-2 sm:max-w-56 md:max-w-56 lg:hidden"
          closeButton={false}
        >
          <div className="flex items-center gap-3 p-4 pt-3 md:hidden">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-xl font-bold">Ourmada</span>
          </div>
          <Navigation organizationId={organizationId} />
        </NavigationSheetContent>
      </NavigationSheet>
      <main className="mx-auto mb-12 w-full pl-4 pr-4 pt-20 md:max-w-3xl md:pl-60 lg:max-w-5xl xl:max-w-7xl">
        {children}
      </main>
    </>
  );
}
