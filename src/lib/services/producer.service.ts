import { type Producer } from "../entities/producer.entity";
import { fetcher } from "./api";

export const getAllProducers = async (page: number = 1, limit: number = 10) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  return fetcher<{
    data: Producer[];
    total: number;
    page: number;
    lastPage: number;
  }>(`/producers?${params.toString()}`);
};

export const getProducerById = (id: string) => fetcher<Producer>(`/producers/${id}`);

export const createProducer = (data: Partial<Producer>) =>
  fetcher<Producer>("/producers", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateProducer = (id: string, data: Partial<Producer>) =>
  fetcher<Producer>(`/producers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteProducer = (id: string) =>
  fetcher<Producer>(`/producers/${id}`, {
    method: "DELETE",
  });
