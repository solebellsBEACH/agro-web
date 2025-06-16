import { Button } from "./button";

export function CreateHeader({ label, onCreate }: { label:string, onCreate: () => void }) {
  return (
    <section className="w-full bg-card p-2 rounded mb-4">
      <Button onClick={onCreate}>{label}</Button>
    </section>
  );
}
