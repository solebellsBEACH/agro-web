import { ColumnDef } from "@tanstack/react-table";
import { Producer } from "@/lib/entities/producer.entity";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

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
          <div className="flex gap-2 justify-end">
            <Button size="icon" variant="outline" onClick={() => onEdit(producer)}>
              <Pencil className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="destructive" onClick={() => onDelete(producer)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
