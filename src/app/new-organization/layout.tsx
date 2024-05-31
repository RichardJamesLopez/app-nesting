export default function NewOrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto mb-12 w-full max-w-xl px-4 pt-20">{children}</main>
  );
}
