import Header from '#/ui/header';
import { GlobalNav } from '#/ui/global-nav';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-y-scroll bg-slate-200 bg-[url('/grid.svg')] shadow  shadow-blue-500/40">
      <GlobalNav />
      <div className="mx-auto  h-screen bg-slate-200 py-20 pl-0 lg:py-0 lg:pl-64">
        <div className="rounded-lg">
          <Header />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
