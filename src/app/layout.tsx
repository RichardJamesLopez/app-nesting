import { Inter } from "next/font/google";
import Image from "next/image";

import "~/styles/globals.css";
import {
  Navigation,
  NavigationSheet,
  NavigationSheetContent,
} from "~/components/navigation";
import { Header } from "~/components/header";
import { cn } from "~/lib/utils";
import { ContextProviders } from "~/components/contextProviders";
import { Toaster } from "~/components/ui/sonner";
import { TestToolbar } from "~/components/testToolbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Ourmada",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(`font-sans ${inter.variable}`, "flex bg-gray-100")}>
        <ContextProviders>
          <NavigationSheet>
            <Header />
            <div className="hidden h-screen w-full max-w-56 flex-col gap-4 bg-white p-2 pt-20 md:block">
              <Navigation />
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
              <Navigation />
            </NavigationSheetContent>
          </NavigationSheet>
          <main className="mx-auto mb-12 w-full px-4 pt-20 md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
            {children}
          </main>
        </ContextProviders>
        <Toaster />
        <TestToolbar />
      </body>
    </html>
  );
}
