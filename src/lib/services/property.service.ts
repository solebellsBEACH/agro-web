import { type Property, type CreatePropertyDto } from "@/lib/entities/property.entity";

import { fetcher } from "./api";

export const getAllProperties = async (page: number = 1, limit: number = 10) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  return fetcher<{
    data: Property[];
    total: number;
    page: number;
    lastPage: number;
  }>(`/properties?${params.toString()}`);
};

export const getPropertyById = (id: string) => fetcher<Property>(`/properties/${id}`);

export const deleteProperty = (id: string) => fetcher<void>(`/properties/${id}`, { method: "DELETE" });

export const updateProperty = (id: string, data: Partial<Property>) =>
  fetcher<Property>(`/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const createProperty = (data: CreatePropertyDto) =>
  fetcher<Property>("/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
