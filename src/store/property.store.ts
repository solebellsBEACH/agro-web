import { create } from "zustand";

import { type Property } from "@/lib/entities/property.entity";
import { getAllProperties } from "@/lib/services/property.service";

interface PropertyStore {
  properties: Property[] | null;
  loading: boolean;
  total: number;
  page: number;
  lastPage: number;
  fetchProperties: (page?: number, limit?: number) => Promise<void>;
}

export const usePropertyStore = create<PropertyStore>((set) => ({
  properties: null,
  loading: false,
  total: 0,
  page: 1,
  lastPage: 1,
  fetchProperties: async (page = 1, limit = 10) => {
    set({ loading: true });
    const response = await getAllProperties(page, limit);
    set({
      properties: response.data,
      total: response.total,
      page: response.page,
      lastPage: response.lastPage,
      loading: false,
    });
  },
}));
