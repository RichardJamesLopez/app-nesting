export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto mb-12 w-full px-4 pt-20 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
      {children}
    </main>
  );
}
