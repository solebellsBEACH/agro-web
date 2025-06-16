"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
import { Property } from "@/lib/entities/property.entity";

export const description = "An interactive area chart";

const chartConfig: ChartConfig = {
  total_area: {
    label: "Área Total",
    color: "var(--chart-1)",
  },
  vegetation_area: {
    label: "Área Plantável",
    color: "var(--chart-2)",
  },
};

export function ChartAreaInteractive({ data }: { data: Property[] }) {
  const isMobile = useIsMobile();

  const chartData = React.useMemo(() => {
    return data.map((item) => ({
      name: item.name,
      total_area: item.total_area,
      vegetation_area: item.vegetation_area,
    }));
  }, [data]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Áreas Totais e Plantáveis</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillVegetationArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-vegetation_area)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-vegetation_area)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillTotalArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-total_area)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-total_area)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(_, payload) =>
                    payload && payload.length > 0 ? `Propriedade: ${payload[0].payload.name}` : ""
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="total_area"
              type="natural"
              fill="url(#fillTotalArea)"
              stroke="var(--color-total_area)"
              stackId="a"
            />
            <Area
              dataKey="vegetation_area"
              type="natural"
              fill="url(#fillVegetationArea)"
              stroke="var(--color-vegetation_area)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
