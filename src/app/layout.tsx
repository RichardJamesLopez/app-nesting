import { Inter } from "next/font/google";

import "~/styles/globals.css";
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
        <ContextProviders>{children}</ContextProviders>
        <Toaster />
        <TestToolbar />
      </body>
    </html>
  );
}
