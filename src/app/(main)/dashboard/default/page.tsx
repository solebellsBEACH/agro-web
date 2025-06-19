"use client";

import React, { useEffect } from "react";

import { useCropStore } from "@/store/crops.store";
import { usePropertyStore } from "@/store/property.store";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { SectionCards } from "./_components/section-cards";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { InsightsSection } from "./_components/insights-section";
import { useInsightsStore } from "@/store/insights.store";

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
