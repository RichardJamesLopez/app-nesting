export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-grow items-center justify-center">
      {params.id}
    </main>
  );
}
