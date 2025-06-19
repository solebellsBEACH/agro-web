import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { statesCoordinates } from "@/lib/mocks/statesCoordinates";
import { InsightByNameValue } from "@/lib/services/insights.service";
import dynamic from "next/dynamic";

const StateDistributionMap = dynamic(
  () => import("./state-distribution-map.client").then(mod => mod.default),
  { ssr: false }
);

interface InsightData {
  totalFarms: number;
  totalHectares: number;
  byState: InsightByNameValue[];
  byCrop: InsightByNameValue[];
  landUse: InsightByNameValue[];
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-accent)",
];

export function InsightsSection({ data }: { data: InsightData }) {
  const enrichedByState = data.byState.map((item) => ({
    ...item,
    lat: statesCoordinates[item.name]?.lat ?? -14.235,
    lng: statesCoordinates[item.name]?.lng ?? -51.9253,
  }));

  // Ajusta altura dos gráficos por cultura e uso do solo
  const maxLength = Math.max(data.byCrop.length, data.landUse.length);
  const baseHeight = 300;
  const extraHeightPerItem = 20;
  const chartHeight =
    baseHeight + (maxLength > 5 ? (maxLength - 5) * extraHeightPerItem : 0);
  const outerRadius = 80;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold tracking-tight text-primary">
        Visão Geral
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Total de Fazendas
            </CardTitle>
            <div className="text-2xl font-bold">{data.totalFarms}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Área Total (ha)
            </CardTitle>
            <div className="text-2xl font-bold">{data.totalHectares}</div>
          </CardHeader>
        </Card>
      </div>

      <Card className="h-[450px]">
        <CardHeader>
          <CardTitle>Distribuição por Estado</CardTitle>
        </CardHeader>
        <CardContent className="h-full p-0">
          <StateDistributionMap data={enrichedByState} />
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card style={{ height: chartHeight }}>
          <CardHeader>
            <CardTitle>Por Cultura Plantada</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.byCrop}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={outerRadius}
                  label={false}
                  labelLine={false}
                >
                  {data.byCrop.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: 10 }}
                  iconSize={8}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card style={{ height: chartHeight }}>
          <CardHeader>
            <CardTitle>Uso do Solo</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.landUse}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={outerRadius}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {data.landUse.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => value.toLocaleString()} />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: 10 }}
                  iconSize={8}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
