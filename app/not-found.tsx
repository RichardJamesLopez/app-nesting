import { Boundary } from '#/ui/boundary';
import { GlobalNav } from '#/ui/global-nav';

export default function NotFound() {
  return (
    <>
      <GlobalNav />
      <div className="lg:pl-56">
        <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
          <div className=" rounded-lg  p-px shadow-lg">
            <div className="rounded-lg bg-white p-3.5 lg:p-6">
              <Boundary color="pink">
                <div className="text-vercel-pink space-y-4">
                  <h2 className="text-lg font-bold">Not Found</h2>

                  <p className="text-sm">Could not find requested resource</p>
                </div>
              </Boundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
