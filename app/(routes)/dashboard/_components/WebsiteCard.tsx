import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WebsiteInfoType } from "@/configs/type";
import { Globe, TrendingUp, Users, ExternalLink } from "lucide-react";
import { Area, AreaChart, CartesianGrid } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Link from "next/link";
import { LoadingLink } from "@/components/ui/loading-link";

const chartConfig = {
  desktop: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Props = {
  websiteInfo: WebsiteInfoType;
};

const WebsiteCard = ({ websiteInfo }: Props) => {
  const hourlyData = websiteInfo?.analytics?.hourlyVisitors;
  const chartData =
    hourlyData?.length === 1
      ? [
          {
            ...hourlyData[0],
            hour:
              Number(hourlyData[0].hour) - 1 >= 0
                ? Number(hourlyData[0].hour) - 1
                : 0,
            count: 0,
            hourLabel: `${Number(hourlyData[0].hour) - 1} AM / PM`,
          },
          hourlyData[0],
        ]
      : hourlyData;

  const domain = websiteInfo?.website?.domain.replace("https://", "").replace("http://", "");
  const totalVisitors = websiteInfo?.analytics?.totalVisitors || 0;

  return (
    <LoadingLink 
      href={"/dashboard/website/" + websiteInfo?.website?.websiteId}
      loadingText={`Loading analytics for ${domain}...`}
    >
      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden bg-white cursor-pointer">
        <CardHeader className="pb-4">
          <CardTitle>
            <div className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center flex-1 min-w-0">
                <div className="bg-blue-500 rounded-lg p-3 transition-colors duration-200 shadow-sm shrink-0">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {domain}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Active tracking
                  </p>
                </div>
              </div>
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          {/* Chart Container */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50/30 transition-colors duration-200">
            <ChartContainer config={chartConfig} className="h-24 w-full">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 8,
                  bottom: 8,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                <Area
                  dataKey="count"
                  type="natural"
                  fill="url(#colorGradient)"
                  fillOpacity={0.6}
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 rounded-lg p-2 transition-colors duration-200">
                <Users className="h-4 w-4 text-green-100" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {totalVisitors.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Visitors today
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-blue-500 group-hover:text-blue-600 transition-colors duration-200">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </LoadingLink>
  );
};

export default WebsiteCard;
