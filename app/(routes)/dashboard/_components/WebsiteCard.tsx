import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WebsiteType } from "@/configs/type";
import { Globe } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type Props = {
  website: WebsiteType;
};

const WebsiteCard = ({ website }: Props) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex gap-2 items-center">
              <Globe className="h-8 w-8 p-2 rounded-md bg-primary text-white" />
              <h2 className="font-bold text-lg">
                {website?.domain.replace("https://", "")}
              </h2>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="max-h-20 w-full">
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-primary)"
                fillOpacity={0.4}
                stroke="var(--color-primary)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>

          <h2 className="text-sm mt-1">
            <strong>24 Visitors</strong>{" "}
          </h2>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteCard;
