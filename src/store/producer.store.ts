import { create } from "zustand";

import { type Producer } from "@/lib/entities/producer.entity";
import { getAllProducers } from "@/lib/services/producer.service";

interface ProducerStore {
  producers: Producer[];
  loading: boolean;
  page: number;
  lastPage: number;
  total: number;
  fetchProducers: (page?: number, limit?: number) => Promise<void>;
}

export const useProducerStore = create<ProducerStore>((set) => ({
  producers: [],
  loading: false,
  page: 1,
  lastPage: 1,
  total: 0,
  fetchProducers: async (page = 1, limit = 10) => {
    set({ loading: true });
    const data = await getAllProducers(page, limit);
    set({
      producers: data.data,
      loading: false,
      page: data.page,
      lastPage: data.lastPage,
      total: data.total,
    });
  },
}));
