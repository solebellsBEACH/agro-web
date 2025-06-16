import { type Property } from "./property.entity";

export interface Crop {
  id: string;
  name: string;
  harvest_year: number;
  value_per_unit: number;
  utilization_percentage: number;
  expected_yield: number;
  value_growth: number;
  property: Property;
}
