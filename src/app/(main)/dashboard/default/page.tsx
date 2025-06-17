"use client";

import { useEffect } from "react";

import { useCropStore } from "@/store/crops.store";
import { usePropertyStore } from "@/store/property.store";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { SectionCards } from "./_components/section-cards";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Page() {
  const { fetchCrops, crops, loading } = useCropStore();
  const { fetchProperties, properties } = usePropertyStore();

  useEffect(() => {
    fetchCrops();
    fetchProperties();
  }, []);

  if (!crops || loading || !properties) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards data={crops} />
      <ChartAreaInteractive data={properties} />
    </div>
  );
}
