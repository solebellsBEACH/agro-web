import { create } from "zustand";

import { type Crop } from "@/lib/entities/crop.entity";
import { getAllCrops } from "@/lib/services/crop.service";

interface CropStore {
  crops: Crop[] | null;
  loading: boolean;
  page: number;
  lastPage: number;
  total: number;
  fetchCrops: (page?: number, limit?: number) => Promise<void>;
}

export const useCropStore = create<CropStore>((set) => ({
  crops: null,
  loading: false,
  page: 1,
  lastPage: 1,
  total: 0,
  fetchCrops: async (page = 1, limit = 10) => {
    set({ loading: true });
    const data = await getAllCrops(page, limit);
    set({
      crops: data.data,
      loading: false,
      page: data.page,
      lastPage: data.lastPage,
      total: data.total,
    });
  },
}));
