import { fetcher } from "./api";

export interface InsightByNameValue {
  name: string;
  value: number;
}

export interface InsightsResponse {
  totalFarms: number;
  totalHectares: number;
  byState: InsightByNameValue[];
  byCrop: InsightByNameValue[];
  landUse: InsightByNameValue[];
}

export const getInsights = async (): Promise<InsightsResponse> => {
  return fetcher<InsightsResponse>(`/insights`);
};
