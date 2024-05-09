export default function Page({ params }: { params: { id: string } }) {
  return <>{params.id}</>;
}
