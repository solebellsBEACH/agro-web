import { type Crop } from "./crop.entity";
import { type Producer } from "./producer.entity";

export interface Property {
  id: string;
  name: string;
  city: string;
  state: string;
  total_area: number;
  arable_area: number;
  vegetation_area: number;
  has_irrigation: boolean;
  machinery_count: number;
  crops: Crop[];
  producer: Producer;
}

export interface CreatePropertyDto {
  name: string;
  city: string;
  state: string;
  total_area: number;
  arable_area: number;
  vegetation_area: number;
  has_irrigation: boolean;
  machinery_count: number;
  producer: Producer;
}
