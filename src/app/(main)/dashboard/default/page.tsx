"use client";

import React, { useEffect } from "react";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import { useCropStore } from "@/store/crops.store";
import { usePropertyStore } from "@/store/property.store";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { SectionCards } from "./_components/section-cards";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { InsightsSection } from "./_components/insights-section";
import { useInsightsStore } from "@/store/insights.store";

// Corrigir ícones padrão do Leaflet para o marker funcionar corretamente
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Page() {
  const { fetchCrops, crops, loading } = useCropStore();
  const { fetchProperties, properties } = usePropertyStore();
  const { fetchInsights, data } = useInsightsStore();

  useEffect(() => {
    fetchCrops();
    fetchProperties();
    fetchInsights();
  }, []);

  if (!crops || loading || !properties) {
    return <LoadingSpinner />;
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <InsightsSection data={data} />
      <SectionCards data={crops} />
      <ChartAreaInteractive data={properties} />
    </div>
  );
}
