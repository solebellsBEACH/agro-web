import { TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Crop } from "@/lib/entities/crop.entity";

export function SectionCards({ data }: { data: Crop[] }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {data.map((item) => {
        return (
          <Card key={`${item.id}-section-card`} className="@container/card">
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
              <div className="text-muted-foreground">{item.utilization_percentage}% de utilização por lote</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
