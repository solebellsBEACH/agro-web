import { ColumnDef } from "@tanstack/react-table";
import { Crop } from "@/lib/entities/crop.entity";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export function cropColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (crop: Crop) => void;
  onDelete: (crop: Crop) => void;
}): ColumnDef<Crop>[] {
  return [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "harvest_year",
      header: "Ano da Safra",
      cell: ({ row }) => row.original.harvest_year,
    },
    {
      accessorKey: "value_per_unit",
      header: "Valor por Unidade",
      cell: ({ row }) => `R$ ${row.original.value_per_unit.toFixed(2)}`,
    },
    {
      accessorKey: "utilization_percentage",
      header: "Utilização (%)",
      cell: ({ row }) => `${row.original.utilization_percentage}%`,
    },
    {
      accessorKey: "expected_yield",
      header: "Produtividade Esperada",
      cell: ({ row }) => `${row.original.expected_yield} kg/ha`,
    },
    {
      accessorKey: "value_growth",
      header: "Crescimento (%)",
      cell: ({ row }) => `${row.original.value_growth}%`,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const crop = row.original;
        return (
          <div className="flex gap-2 justify-end">
            <Button size="icon" variant="outline" onClick={() => onEdit(crop)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="destructive" onClick={() => onDelete(crop)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
