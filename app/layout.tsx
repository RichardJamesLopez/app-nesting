'use client';

import '#/styles/globals.css';
import { Web3Modal } from '../context/Web3Modal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  sampleModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
