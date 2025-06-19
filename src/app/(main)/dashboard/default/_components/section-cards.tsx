import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Crop } from "@/lib/entities/crop.entity";

export function SectionCards({ data }: { data: Crop[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-primary">Culturas em destaque</h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent snap-x">
        {data.map((item) => (
          <Card
            key={`${item.id}-section-card`}
            className="min-w-[250px] shrink-0 snap-start @container/card"
          >
            <CardHeader>
              <CardDescription>
                {item.name} - Ano {item.harvest_year}
              </CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ${item.value_per_unit}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <TrendingUp />
                  {item.value_growth}%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Crescimento Mensal <TrendingUp className="size-4" />
                {item.value_growth}%
              </div>
              <div className="text-muted-foreground">
                {item.utilization_percentage}% de utilização por lote
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
