import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type InsightData = {
  totalFarms: number;
  totalHectares: number;
  byState: { name: string; value: number }[];
  byCrop: { name: string; value: number }[];
  landUse: { name: string; value: number }[];
};

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-accent)",
];

export function InsightsSection({ data }: { data: InsightData }) {
  const datasets = [
    { data: data.byState, title: "Distribuição por Estado" },
    { data: data.byCrop, title: "Por Cultura Plantada" },
    { data: data.landUse, title: "Uso do Solo" },
  ];

  const getHeightForDataset = (length: number) => 300 + Math.max(0, length - 5) * 25;
  const heights = datasets.map(d => getHeightForDataset(d.data.length));
  const maxHeight = Math.max(...heights);

  const maxOuterRadius = 90;
  const baseHeight = 300;
  const baseOuterRadius = 80;
  const getOuterRadius = (height: number) => 
    Math.min(maxOuterRadius, baseOuterRadius * (height / baseHeight));

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold tracking-tight text-primary">Visão Geral</h2>

      {/* Cards resumo */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Total de Fazendas</CardTitle>
            <div className="text-2xl font-bold">{data.totalFarms}</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Área Total (ha)</CardTitle>
            <div className="text-2xl font-bold">{data.totalHectares}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {datasets.map(({ data: dataset, title }, idx) => {
          const height = maxHeight;
          const outerRadius = getOuterRadius(heights[idx]);
          const showLabel = idx !== 1;

          return (
            <Card key={idx} className="flex flex-col" style={{ height }}>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataset}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={outerRadius}
                      label={
                        showLabel
                          ? ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`
                          : false
                      }
                      labelLine={showLabel}
                    >
                      {dataset.map((_, index) => (
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
          );
        })}
      </div>
    </section>
  );
}
