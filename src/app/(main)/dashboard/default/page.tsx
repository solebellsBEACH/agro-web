"use client";

import { useEffect } from "react";

import { useCropStore } from "@/store/crops.store";

import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { SectionCards } from "./_components/section-cards";

export default function Page() {
  const { fetchCrops, crops, loading } = useCropStore();

  useEffect(() => {
    fetchCrops();
  }, []);

  if (!crops || loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <SectionCards data={crops} />
      <ChartAreaInteractive />
    </div>
  );
}
