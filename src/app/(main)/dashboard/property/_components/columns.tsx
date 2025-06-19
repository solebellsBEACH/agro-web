import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Property } from "@/lib/entities/property.entity";

export function propertyColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (property: Property) => void;
  onDelete: (property: Property) => void;
}): ColumnDef<Property>[] {
  return [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "city",
      header: "Cidade",
      cell: ({ row }) => row.original.city,
    },
    {
      accessorKey: "state",
      header: "Estado",
      cell: ({ row }) => row.original.state,
    },
    {
      accessorKey: "total_area",
      header: "Área Total (ha)",
      cell: ({ row }) => row.original.total_area.toLocaleString("pt-BR"),
    },
    {
      accessorKey: "arable_area",
      header: "Área Agricultável (ha)",
      cell: ({ row }) => row.original.arable_area.toLocaleString("pt-BR"),
    },
    {
      accessorKey: "vegetation_area",
      header: "Área de Vegetação (ha)",
      cell: ({ row }) => row.original.vegetation_area.toLocaleString("pt-BR"),
    },
    {
      accessorKey: "has_irrigation",
      header: "Irrigação",
      cell: ({ row }) => (row.original.has_irrigation ? "Sim" : "Não"),
    },
    {
      accessorKey: "machinery_count",
      header: "Máquinas",
      cell: ({ row }) => row.original.machinery_count,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const property = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button size="icon" variant="outline" onClick={() => onEdit(property)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="destructive" onClick={() => onDelete(property)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}