import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WebsiteInfoType } from "@/configs/type";
import React from "react";
import LabelCountItem from "./LabelCountItem";
import { Separator } from "@/components/ui/separator";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard, SkeletonChart } from "@/components/ui/loading";
import { TrendingUp, Users, Clock, Eye, Activity } from "lucide-react";

type Props = {
  WebsiteInfo: WebsiteInfoType | undefined | null;
  loading?: boolean;
  analyticType: string;
  liveUserCount: number;
};

const chartConfig = {
  desktop: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PageViewAnalytics = ({ WebsiteInfo, loading, analyticType, liveUserCount }: Props) => {
  const webAnalytics = WebsiteInfo?.analytics;

  return (
    <div className="space-y-6">
      {!loading ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <LabelCountItem
                      label="Visitors"
                      value={webAnalytics?.totalVisitors}
                    />
                  </div>
                  <div className="bg-blue-500 rounded-lg p-2">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <LabelCountItem
                      label="Page Views"
                      value={webAnalytics?.totalSessions}
                    />
                  </div>
                  <div className="bg-green-700 rounded-lg p-2">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <LabelCountItem
                      label="Total Time"
                      value={
                        (Number(webAnalytics?.totalActiveTime) / 60).toFixed(1) + "m"
                      }
                    />
                  </div>
                  <div className="bg-purple-500 rounded-lg p-2">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <LabelCountItem
                      label="Avg. Time"
                      value={
                        (Number(webAnalytics?.avgActiveTime) / 60).toFixed(1) + "m"
                      }
                    />
                  </div>
                  <div className="bg-orange-500 rounded-lg p-2">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <LabelCountItem label="Live Users" value={liveUserCount ?? 0} />
                  </div>
                  <div className="bg-red-500 rounded-lg p-2">
                    <div className="relative">
                      <Activity className="h-5 w-5 text-white" />
                      {liveUserCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Section */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500 rounded-lg p-2">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {analyticType === "hourly" ? "Hourly" : "Daily"} Analytics
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Visitor traffic over time
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-sm font-medium text-blue-600">
                    {analyticType === "hourly" ? "24 Hours" : "Daily View"}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="bg-gray-50 rounded-lg p-4">
                <ChartContainer config={chartConfig} className="h-80 w-full">
                  <AreaChart
                    data={
                      analyticType === "hourly"
                        ? webAnalytics?.hourlyVisitors
                        : webAnalytics?.dailyVisitors
                    }
                    margin={{
                      left: 12,
                      right: 12,
                      top: 12,
                      bottom: 12,
                    }}
                  >
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      vertical={false} 
                      strokeDasharray="3 3" 
                      stroke="#e5e7eb" 
                    />
                    <XAxis
                      dataKey={analyticType === "hourly" ? "hourLabel" : "date"}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={40}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <ChartTooltip
                      cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '3 3' }}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                      dataKey="count"
                      type="monotone"
                      fill="url(#colorGradient)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-6">
          {/* Loading Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonCard key={i} className="h-24" />
            ))}
          </div>
          
          {/* Loading Chart */}
          <SkeletonChart />
        </div>
      )}
    </div>
  );
};

export default PageViewAnalytics;
