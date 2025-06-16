import { type Crop } from "../entities/crop.entity";
import { fetcher } from "./api";

export const getAllCrops = async (page: number = 1, limit: number = 10) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });

  return fetcher<{
    data: Crop[];
    total: number;
    page: number;
    lastPage: number;
  }>(`/crops?${params.toString()}`);
};

export const getCropById = (id: string) => {
  return fetcher<Crop>(`/crops/${id}`);
};

export const createCrop = async (data: Partial<Crop>) => {
  return fetcher<Crop>(`/crops`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const updateCrop = async (id: string, data: Partial<Crop>) => {
  return fetcher<Crop>(`/crops/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteCrop = async (id: string) => {
  return fetcher<void>(`/crops/${id}`, {
    method: "DELETE",
  });
};
