'use client';

import { useEffect, useState } from "react";
import { Crop } from "@/lib/entities/crop.entity";
import { getCoreRowModel, useReactTable, PaginationState } from "@tanstack/react-table";

import { CreateHeader } from "@/components/ui/create-header";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useCropStore } from "@/store/crops.store";
import { createCrop, deleteCrop, updateCrop } from "@/lib/services/crop.service";
import { cropColumns } from "./_components/columns";
import { CropModal } from "./_components/CropModal";


export default function CropsPage() {
  const { crops, fetchCrops, page, lastPage, loading } = useCropStore();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: 10,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Partial<Crop> | null>(null);

  useEffect(() => {
    fetchCrops(pagination.pageIndex + 1, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (crop: Crop) => {
    setEditingCrop(crop);
    setModalOpen(true);
  };

  const handleDelete = async (crop: Crop) => {
    if (confirm(`Deseja excluir a cultura "${crop.name}"?`)) {
      await deleteCrop(crop.id);
      fetchCrops(pagination.pageIndex + 1, pagination.pageSize);
    }
  };

  const handleSave = async (crop: Crop) => {
    if (crop.id) {
      await updateCrop(crop.id, crop);
    } else {
      await createCrop(crop);
    }
    setModalOpen(false);
    fetchCrops(pagination.pageIndex + 1, pagination.pageSize);
  };

  const table = useReactTable({
    data: crops||[],
    columns: cropColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: lastPage,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <>
      <CreateHeader 
      label="Criar Safra"
      onCreate={() => {
        setEditingCrop(null);
        setModalOpen(true);
      }} />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <DataTable table={table} columns={cropColumns({ onEdit: handleEdit, onDelete: handleDelete })} />
          <DataTablePagination table={table} />
        </>
      )}

      <CropModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingCrop || {}}
      />
    </>
  );
}
