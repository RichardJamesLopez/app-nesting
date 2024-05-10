import { Inter } from "next/font/google";

import "~/styles/globals.css";
import { Navigation } from "~/components/navigation";
import { Header } from "~/components/header";
import { cn } from "~/lib/utils";
import { ContextProviders } from "~/components/contextProviders";

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
      <body className={cn(`font-sans ${inter.variable}`, "flex")}>
        <ContextProviders>
          <Navigation />
          <main className="relative flex flex-grow items-center justify-center">
            <Header />
            {children}
          </main>
        </ContextProviders>
      </body>
    </html>
  );
}
