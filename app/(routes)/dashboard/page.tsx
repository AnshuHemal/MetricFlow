"use client";
import { Button } from "@/components/ui/button";
import { WebsiteInfoType } from "@/configs/type";
import axios from "axios";
import Link from "next/link";
import { LoadingLink } from "@/components/ui/loading-link";
import { useEffect, useState } from "react";
import WebsiteCard from "./_components/WebsiteCard";
import { Skeleton } from "@/components/ui/skeleton";
import Loading, { SkeletonCard } from "@/components/ui/loading";
import { useApi } from "@/hooks/use-api";
import { format } from "date-fns-tz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Globe, Plus, TrendingUp, Users, Eye, Activity } from "lucide-react";

const Dashboard = () => {
  const [websiteList, setWebsiteList] = useState<WebsiteInfoType[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  const { loading, execute } = useApi({
    loadingText: "Loading your analytics dashboard...",
    showGlobalLoading: false
  });

  useEffect(() => {
    setIsVisible(true);
    getUserWebsites();
  }, []);

  const getUserWebsites = async () => {
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      await execute(async () => {
        const result = await axios.get(
          "/api/website?from=" + today + "&to=" + today
        );
        setWebsiteList(result?.data);
        return result.data;
      });
    } catch (error) {
    }
  };

  // Calculate total stats
  const totalVisitors = websiteList?.reduce((sum, website) => sum + (website?.analytics?.totalVisitors || 0), 0) || 0;
  const totalWebsites = websiteList?.length || 0;
  const avgVisitorsPerSite = totalWebsites > 0 ? Math.round(totalVisitors / totalWebsites) : 0;

  return (
    <div className="space-y-8 relative">
      {/* Header Section */}
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-normal bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Monitor your website performance and visitor insights
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Activity className="h-4 w-4" />
              <span>Real-time analytics • Updated {format(new Date(), "MMM dd, yyyy")}</span>
            </div>
          </div>
          <LoadingLink href={"/dashboard/new"} loadingText="Setting up new website...">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Website
            </Button>
          </LoadingLink>
        </div>
      </div>

      {/* Stats Overview Cards */}
      {!loading && websiteList?.length > 0 && (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Websites
              </CardTitle>
              <div className="bg-blue-500 rounded-lg p-2">
                <Globe className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {totalWebsites}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Active tracking sites
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Visitors
              </CardTitle>
              <div className="bg-green-700 rounded-lg p-2">
                <Users className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {totalVisitors.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Today's visitors
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg per Site
              </CardTitle>
              <div className="bg-purple-500 rounded-lg p-2">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">
                {avgVisitorsPerSite}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Average visitors
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Section */}
      <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 rounded-lg p-2">
              <BarChart3 className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Your Websites
              </h2>
              {!loading && websiteList?.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {websiteList.length} {websiteList.length === 1 ? 'website' : 'websites'} being tracked
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && websiteList?.length === 0 && (
          <Card className="border-2 border-dashed border-gray-200 bg-white">
            <CardContent className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="bg-gray-50 rounded-full p-8 mb-8">
                <Eye className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Start tracking your first website
              </h3>
              <p className="text-gray-600 mb-10 max-w-md leading-relaxed">
                Add your website to start collecting valuable analytics data and insights about your visitors. 
                Get detailed reports on traffic, user behavior, and performance metrics.
              </p>
              <LoadingLink href={"/dashboard/new"} loadingText="Setting up new website...">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 cursor-pointer px-8 py-3"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add Your First Website
                </Button>
              </LoadingLink>
            </CardContent>
          </Card>
        )}

        {/* Website Cards Grid */}
        {!loading && websiteList?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {websiteList?.map((website, index) => (
              <WebsiteCard key={index} websiteInfo={website} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
