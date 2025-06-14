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

export const getCropById = (id: string) => fetcher<Crop>(`/crops/${id}`);
