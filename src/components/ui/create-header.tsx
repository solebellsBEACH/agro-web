import { Button } from "./button";

export function CreateHeader({
  label,
  onCreate,
  exportChild,
}: {
  label: string;
  onCreate: () => void;
  exportChild?: React.ReactNode;
}) {
  return (
    <section className="w-full bg-card p-2 rounded mb-4 flex items-center">
      <Button onClick={onCreate}>{label}</Button>
      {exportChild && <div>{exportChild}</div>}
    </section>
  );
}
