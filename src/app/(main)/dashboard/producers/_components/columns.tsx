import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Producer } from "@/lib/entities/producer.entity";

export function producerColumns({
  onEdit,
  onDelete,
}: {
  onEdit: (producer: Producer) => void;
  onDelete: (producer: Producer) => void;
}): ColumnDef<Producer>[] {
  return [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "document",
      header: "Documento",
      cell: ({ row }) => row.original.document,
    },
    {
      accessorKey: "properties",
      header: "Propriedades",
      cell: ({ row }) => `${row.original.properties.length} propriedades`,
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const producer = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Button size="icon" variant="outline" onClick={() => onEdit(producer)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="destructive" onClick={() => onDelete(producer)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
