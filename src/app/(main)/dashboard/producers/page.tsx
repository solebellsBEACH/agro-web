"use client";

import { useEffect, useState } from "react";
import { PaginationState, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { useProducerStore } from "@/store/producer.store";
import { createProducer, updateProducer, deleteProducer } from "@/lib/services/producer.service";
import { Producer } from "@/lib/entities/producer.entity";

import { CreateHeader } from "@/components/ui/create-header";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

import { ProducerModal } from "./_components/ProducerModal";
import { producerColumns } from "./_components/columns";

export default function ProducersPage() {
  const { producers, fetchProducers, page, lastPage, loading } = useProducerStore();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: 10,
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProducer, setEditingProducer] = useState<Partial<Producer> | null>(null);

  useEffect(() => {
    fetchProducers(pagination.pageIndex + 1, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (producer: Producer) => {
    setEditingProducer(producer);
    setModalOpen(true);
  };

  const handleDelete = async (producer: Producer) => {
    if (confirm(`Deseja excluir o produtor "${producer.name}"?`)) {
      await deleteProducer(producer.id);
      fetchProducers(pagination.pageIndex + 1, pagination.pageSize);
    }
  };

  const handleSave = async (producer: Producer) => {
    if (producer.id) {
      await updateProducer(producer.id, producer);
    } else {
      await createProducer(producer);
    }
    setModalOpen(false);
    fetchProducers(pagination.pageIndex + 1, pagination.pageSize);
  };

  const table = useReactTable({
    data: producers || [],
    columns: producerColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: lastPage,
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <>
      <CreateHeader
        label="Criar Produtor"
        onCreate={() => {
          setEditingProducer(null);
          setModalOpen(true);
        }}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <DataTable table={table} columns={producerColumns({ onEdit: handleEdit, onDelete: handleDelete })} />
          <DataTablePagination table={table} />
        </>
      )}

      <ProducerModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingProducer || {}}
      />
    </>
  );
}
