import { ColumnDef } from "@tanstack/react-table";

import { Property } from "@/lib/entities/property.entity";

export const propertyColumns: ColumnDef<Property>[] = [
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
];

export const mockProperties: Property[] = [
  {
    id: "1",
    name: "Fazenda Santa Maria",
    city: "Ribeirão Preto",
    state: "SP",
    total_area: 2000,
    arable_area: 1500,
    vegetation_area: 400,
    has_irrigation: true,
    machinery_count: 20,
    crops: [
      {
        id: "crop-1",
        name: "Soja",
        harvest_year: 2024,
        value_per_unit: 2.5,
        utilization_percentage: 80,
        expected_yield: 3000,
        value_growth: 5,
        property: {} as Property, // ou `undefined` temporariamente
      },
      {
        id: "crop-2",
        name: "Milho",
        harvest_year: 2024,
        value_per_unit: 1.8,
        utilization_percentage: 70,
        expected_yield: 2500,
        value_growth: 3,
        property: {} as Property,
      },
    ],
    producer: {
      id: "prod-1",
      name: "Carlos Souza",
      document: "123.456.789-00",
      properties: [],
    },
  },
  {
    id: "2",
    name: "Sítio Boa Vista",
    city: "Chapecó",
    state: "SC",
    total_area: 800,
    arable_area: 500,
    vegetation_area: 250,
    has_irrigation: false,
    machinery_count: 8,
    crops: [
      {
        id: "crop-3",
        name: "Feijão",
        harvest_year: 2025,
        value_per_unit: 3.2,
        utilization_percentage: 60,
        expected_yield: 1800,
        value_growth: 4,
        property: {} as Property,
      },
    ],
    producer: {
      id: "prod-2",
      name: "Ana Lima",
      document: "987.654.321-00",
      properties: [],
    },
  },
];
