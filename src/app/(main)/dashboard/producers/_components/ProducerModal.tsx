"use client";

import { useEffect, useState } from "react";
import { Producer } from "@/lib/entities/producer.entity";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ProducerModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (producer: Producer) => void;
  initialData?: Partial<Producer>;
};

export function ProducerModal({ open, onClose, onSave, initialData = {} }: ProducerModalProps) {
  const [form, setForm] = useState<Partial<Producer>>(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.document) return;
    onSave(form as Producer);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{form.id ? "Editar" : "Criar"} Produtor</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input name="name" placeholder="Nome" value={form.name || ""} onChange={handleChange} />
          <Input name="document" placeholder="CPF ou CNPJ" value={form.document || ""} onChange={handleChange} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>{form.id ? "Salvar" : "Criar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
