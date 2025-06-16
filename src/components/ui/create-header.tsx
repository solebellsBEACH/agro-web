import { Button } from "./button";

export function CreateHeader({ onCreate }: { onCreate: () => void }) {
  return (
    <section className="w-full bg-card p-2 rounded mb-4">
      <Button onClick={onCreate}>Criar Propriedade</Button>
    </section>
  );
}
