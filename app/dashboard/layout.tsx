import Header from '#/ui/header';
import { GlobalNav } from '#/ui/global-nav';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-200 bg-[url('/grid.svg')]">
      <GlobalNav />
      <div className="mx-auto h-full bg-slate-200 py-20 pl-0 lg:py-0 lg:pl-56">
        <div className="rounded-lg">
          <Header />
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
