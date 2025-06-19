import { Crop } from "@/lib/entities/crop.entity";
import { Property } from "@/lib/entities/property.entity";
import { Producer } from "@/lib/entities/producer.entity";

import * as XLSX from "xlsx";

function generateExcel<T extends object>(data: T[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, filename);
}

export function exportCropsToExcel(crops: Crop[]) {
  generateExcel(crops, "crops.xlsx");
}

export function exportPropertiesToExcel(properties: Property[]) {
  generateExcel(properties, "properties.xlsx");
}

export function exportProducersToExcel(producers: Producer[]) {
  generateExcel(producers, "producers.xlsx");
}
