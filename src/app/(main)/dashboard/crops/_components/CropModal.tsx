"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Crop } from "@/lib/entities/crop.entity";
import { usePropertyStore } from "@/store/property.store";

type CropModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (crop: Crop) => void;
  initialData?: Partial<Crop>;
};

export function CropModal({ open, onClose, onSave, initialData = {} }: CropModalProps) {
  const [form, setForm] = useState<Partial<Crop> & { propertyId?: string }>({
    ...initialData,
    propertyId: initialData.property?.id,
  });

  const { properties, fetchProperties } = usePropertyStore();

  useEffect(() => {
    fetchProperties();
    setForm({
      ...initialData,
      propertyId: initialData.property?.id,
    });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name.includes("_") || name === "harvest_year" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.harvest_year || !form.propertyId) return;
    onSave(form as Crop);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{form.id ? "Editar" : "Criar"} Cultura</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input name="name" placeholder="Nome" value={form.name || ""} onChange={handleChange} />
          <Input
            name="harvest_year"
            placeholder="Ano da Safra"
            type="number"
            value={form.harvest_year ?? ""}
            onChange={handleChange}
          />
          <Input
            name="value_per_unit"
            placeholder="Valor por unidade"
            type="number"
            value={form.value_per_unit ?? ""}
            onChange={handleChange}
          />
          <Input
            name="utilization_percentage"
            placeholder="% de utilização"
            type="number"
            value={form.utilization_percentage ?? ""}
            onChange={handleChange}
          />
          <Input
            name="expected_yield"
            placeholder="Produtividade esperada"
            type="number"
            value={form.expected_yield ?? ""}
            onChange={handleChange}
          />
          <Input
            name="value_growth"
            placeholder="% crescimento"
            type="number"
            value={form.value_growth ?? ""}
            onChange={handleChange}
          />

          <Select
            value={form.propertyId}
            onValueChange={(value) => setForm((prev) => ({ ...prev, propertyId: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma propriedade" />
            </SelectTrigger>
            <SelectContent>
              {properties?.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name} - {property.city}/{property.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{form.id ? "Salvar" : "Criar"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
