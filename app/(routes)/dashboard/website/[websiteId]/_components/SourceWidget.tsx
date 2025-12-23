import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ExternalLink, Share2, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonChart } from "@/components/ui/loading";

type Props = {
  websiteAnalytics: AnalyticsType | undefined;
  loading: boolean;
};

const chartConfig = {
  desktop: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
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
        <image href={imageUrl} width={16} height={16} />
        <text x={20} y={12} fontSize={12} fill="#ffffff">
          {value}
        </text>
      </g>
    );
  };

  if (loading) {
    return <SkeletonChart className="h-80" />;
  }

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-green-700 rounded-lg p-2 shadow-sm">
            <Share2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Traffic Sources
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Where your visitors come from
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Tabs defaultValue="source" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100">
            <TabsTrigger 
              value="source" 
              className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm transition-all duration-200"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Sources
            </TabsTrigger>
            <TabsTrigger 
              value="referral"
              className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all duration-200"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Referrals
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="source" className="mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              {websiteAnalytics?.referrals && websiteAnalytics.referrals.length > 0 ? (
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <BarChart
                    accessibilityLayer
                    data={websiteAnalytics?.referrals}
                    layout="vertical"
                    margin={{
                      right: 16,
                      left: 8,
                    }}
                  >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#e5e7eb" />
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
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                      dataKey="uv"
                      layout="vertical"
                      fill="#059669"
                      opacity={0.8}
                      radius={6}
                    >
                      <LabelList
                        dataKey="domainName"
                        position="insideLeft"
                        offset={8}
                        className="fill-white"
                        fontSize={12}
                        content={<BarLabelWithImage />}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-200 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <ExternalLink className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No source data available</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="referral" className="mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              {websiteAnalytics?.refParams && websiteAnalytics.refParams.length > 0 ? (
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <BarChart
                    accessibilityLayer
                    data={websiteAnalytics?.refParams}
                    layout="vertical"
                    margin={{
                      right: 16,
                      left: 8,
                    }}
                  >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#e5e7eb" />
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
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                      dataKey="uv"
                      layout="vertical"
                      fill="#3b82f6"
                      opacity={0.8}
                      radius={6}
                    >
                      <LabelList
                        dataKey="name"
                        position="insideLeft"
                        offset={8}
                        className="fill-white"
                        fontSize={12}
                        content={<BarLabelWithImage />}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-200 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No referral data available</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SourceWidget;
