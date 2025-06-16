import { create } from "zustand";
import { type Producer } from "@/lib/entities/producer.entity";
import { getAllProducers } from "@/lib/services/producer.service";

interface ProducerState {
  producers: Producer[];
  page: number;
  lastPage: number;
  loading: boolean;
  fetchProducers: (page?: number, limit?: number) => Promise<void>;
}

export const useProducerStore = create<ProducerState>((set) => ({
  producers: [],
  page: 1,
  lastPage: 1,
  loading: false,
  fetchProducers: async (page = 1, limit = 10) => {
    set({ loading: true });
    const response = await getAllProducers(page, limit);
    set({
      producers: response.data,
      page: response.page,
      lastPage: response.lastPage,
      loading: false,
    });
  },
}));
