"use client";

import { useEffect, useState } from "react";

import { getCoreRowModel, useReactTable, PaginationState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { CreateHeader } from "@/components/ui/create-header";
import { Property } from "@/lib/entities/property.entity";
import { createProperty, deleteProperty, updateProperty } from "@/lib/services/property.service";
import { usePropertyStore } from "@/store/property.store";

import { propertyColumns as getPropertyColumns } from "./_components/columns";
import { PropertyModal } from "./_components/PropertyModal";

export default function Properties() {
  const { fetchProperties, properties, loading, lastPage, page, total } = usePropertyStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Partial<Property> | null>(null);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: 10,
  });

  useEffect(() => {
    fetchProperties(pagination.pageIndex + 1, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleDelete = async (property: Property) => {
    if (confirm(`Tem certeza que deseja excluir a propriedade "${property.name}"?`)) {
      await deleteProperty(property.id);
      await fetchProperties(pagination.pageIndex + 1, pagination.pageSize);
    }
  };

  const columns = getPropertyColumns({ onEdit: handleEdit, onDelete: handleDelete });

  const table = useReactTable({
    data: properties ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: lastPage,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  const handleSave = async (property: Property) => {
    if (property.id) {
      await updateProperty(property.id, property);
    } else {
      await createProperty(property);
    }
    setModalOpen(false);
    await fetchProperties(pagination.pageIndex + 1, pagination.pageSize);
  };

  return (
    <>
      <CreateHeader
        label="Criar Propriedade"
        onCreate={() => {
          setEditingProperty(null);
          setModalOpen(true);
        }}
      />

      {loading || !properties ? (
        <h1>Loading</h1>
      ) : properties.length > 0 ? (
        <div>
          <DataTable table={table} columns={columns} />
          <DataTablePagination table={table} />
        </div>
      ) : (
        <p>Nenhuma propriedade encontrada.</p>
      )}

      <PropertyModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingProperty || {}}
      />
    </>
  );
}
