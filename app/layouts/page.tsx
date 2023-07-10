import { ExternalLink } from '#/ui/external-link';

export default function Page() {
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <h1 className="text-xl font-bold">Layouts</h1>

      <ul>
        <li>
          A layout is UI that is lorem ipsum. It is used to wrap pages and other
          layouts.
        </li>
        <li>Try navigating between categories and sub categories.</li>
      </ul>

      <div className="flex gap-2">
        <ExternalLink href="https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts">
          Docs
        </ExternalLink>
        <ExternalLink href="https://github.com/vercel/app-playground/tree/main/app/layouts">
          Code
        </ExternalLink>
      </div>
    </div>
  );
}
