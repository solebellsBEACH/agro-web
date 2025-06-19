"use client";

import { Button } from "@/components/ui/button";
import {
  exportCropsToExcel,
  exportPropertiesToExcel,
  exportProducersToExcel
} from "@/utils/export-data";
import { Crop } from "@/lib/entities/crop.entity";
import { Property } from "@/lib/entities/property.entity";
import { Producer } from "@/lib/entities/producer.entity";

export function ExportButtons({ crops, properties, producers }: { crops?: Crop[] | null, properties?: Property[] | null, producers?: Producer[] }) {
  return (
    <div className="flex flex-wrap gap-4 ml-3">
      {crops && (
        <>
          <Button onClick={() => exportCropsToExcel(crops)}>Exportar Safras Excel</Button>
        </>
      )}

      {properties && (
        <>
          <Button onClick={() => exportPropertiesToExcel(properties)}>Exportar Propriedades Excel</Button>
        </>
      )}

      {producers && (
        <>
          <Button onClick={() => exportProducersToExcel(producers)}>Exportar Produtores Excel</Button>
        </>
      )}
    </div>
  );
}