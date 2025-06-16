"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Property } from "@/lib/entities/property.entity";

import { mockProperties, propertyColumns } from "./_components/columns";

export default function Properties() {
  const properties: Property[] = mockProperties;

  const table = useReactTable({
    data: properties,
    columns: propertyColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {properties.length > 0 ? (
        <div>
          <DataTable table={table} columns={propertyColumns} />
          <DataTablePagination table={table} />
        </div>
      ) : (
        <p>Nenhuma propriedade encontrada.</p>
      )}
    </>
  );
}
