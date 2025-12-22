import { Card, CardContent } from "@/components/ui/card";
import { AnalyticsType, IMAGE_URL_FOR_DOMAINS } from "@/configs/type";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type Props = {
  websiteAnalytics: AnalyticsType | undefined;
  loading: boolean;
};

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

const SourceWidget = ({ websiteAnalytics, loading }: Props) => {
  const BarLabelWithImage = (props: any) => {
    const { x, y, width, height, value } = props;

    const imageUrl = IMAGE_URL_FOR_DOMAINS?.replace("<domain>", value);

    return (
      <g transform={`translate(${x + 8}, ${y + height / 2 - 8})`}>
        {/* SVG image */}
        <image href={imageUrl} width={16} height={16} />
        {/* SVG text */}
        <text x={20} y={12} fontSize={12} fill="#ffffff">
          {value}
        </text>
      </g>
    );
  };

  return (
    <div>
      <Card>
        <CardContent className="p-5">
          <Tabs defaultValue="source" className="w-full">
            <TabsList>
              <TabsTrigger value="source">Source</TabsTrigger>
              <TabsTrigger value="referral">Referral</TabsTrigger>
            </TabsList>
            <TabsContent value="source">
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={websiteAnalytics?.referrals}
                  layout="vertical"
                  margin={{
                    right: 16,
                  }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="domainName"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <XAxis dataKey="uv" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="uv"
                    layout="vertical"
                    fill="var(--color-primary)"
                    opacity={0.7}
                    radius={4}
                  >
                    <LabelList
                      dataKey="domainName"
                      position="insideLeft"
                      offset={8}
                      className="fill-(--color-label)"
                      fontSize={12}
                      content={<BarLabelWithImage />}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="referral">
              <ChartContainer config={chartConfig}>
                <BarChart
                  accessibilityLayer
                  data={websiteAnalytics?.refParams}
                  layout="vertical"
                  margin={{
                    right: 16,
                  }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <XAxis dataKey="uv" type="number" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="uv"
                    layout="vertical"
                    fill="var(--color-primary)"
                    opacity={0.7}
                    radius={4}
                  >
                    <LabelList
                      dataKey="name"
                      position="insideLeft"
                      offset={8}
                      className="fill-(--color-label)"
                      fontSize={12}
                      content={<BarLabelWithImage />}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SourceWidget;
