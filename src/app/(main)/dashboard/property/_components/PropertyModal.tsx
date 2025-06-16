"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Property } from "@/lib/entities/property.entity";
import { useState, useEffect } from "react";

type PropertyModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (property: Property) => void;
  initialData?: Partial<Property>;
};

export function PropertyModal({ open, onClose, onSave, initialData = {} }: PropertyModalProps) {
  const [form, setForm] = useState<Partial<Property>>(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name.includes("area") || name === "machinery_count" ? Number(value) : value,
    }));
  }

  function handleSubmit() {
    if (!form.name || !form.city || !form.state) return;
    onSave(form as Property);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{form.id ? "Editar" : "Criar"} Propriedade</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input name="name" placeholder="Nome" value={form.name || ""} onChange={handleChange} />
          <Input name="city" placeholder="Cidade" value={form.city || ""} onChange={handleChange} />
          <Input name="state" placeholder="Estado" value={form.state || ""} onChange={handleChange} />
          <Input name="total_area" placeholder="Área total" type="number" value={form.total_area ?? ""} onChange={handleChange} />
          <Input name="arable_area" placeholder="Área agricultável" type="number" value={form.arable_area ?? ""} onChange={handleChange} />
          <Input name="vegetation_area" placeholder="Área de vegetação" type="number" value={form.vegetation_area ?? ""} onChange={handleChange} />
          <Input name="machinery_count" placeholder="Máquinas" type="number" value={form.machinery_count ?? ""} onChange={handleChange} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>{form.id ? "Salvar" : "Criar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
