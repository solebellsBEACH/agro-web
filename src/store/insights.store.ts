import { getInsights } from "@/lib/services/insights.service";
import { create } from "zustand";

interface InsightByNameValue {
  name: string;
  value: number;
}

interface InsightsState {
data:{
    totalFarms: number;
  totalHectares: number;
  byState: InsightByNameValue[];
  byCrop: InsightByNameValue[];
  landUse: InsightByNameValue[];
}
  loading: boolean;
  fetchInsights: () => Promise<void>;
}

export const useInsightsStore = create<InsightsState>((set) => ({
data:{
    totalFarms: 0,
  totalHectares: 0,
  byState: [],
  byCrop: [],
  landUse: [],
},
  loading: false,

  fetchInsights: async () => {
    set({ loading: true });
    try {
      const response = await getInsights();
      set({
        data:{
          totalFarms: response.totalFarms,
        totalHectares: response.totalHectares,
        byState: response.byState,
        byCrop: response.byCrop,
        landUse: response.landUse,
        },
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      // opcional: tratar erro ou adicionar estado de erro
    }
  },
}));
