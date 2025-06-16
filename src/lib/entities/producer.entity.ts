import { type Property } from "./property.entity";

export interface Producer {
  id: string;
  name: string;
  document: string;
  properties: Property[];
}
