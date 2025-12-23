"use client";
import { LiveUserType, WebsiteInfoType, WebsiteType } from "@/configs/type";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormInput from "./_components/FormInput";
import PageViewAnalytics from "./_components/PageViewAnalytics";
import { format } from "date-fns-tz";
import SourceWidget from "./_components/SourceWidget";
import { Globe, TrendingUp, Activity, Users } from "lucide-react";

const WebsiteDetail = () => {
  const { websiteId } = useParams();
  const [websiteList, setWebsiteList] = useState<WebsiteType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfoType | null>();
  const [formData, setFormData] = useState<any>({
    analyticType: 'hourly',
    fromDate: new Date(),
    toDate: new Date()
  });
  const [liveUser, setLiveUser] = useState<LiveUserType[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    getWebsiteList();
  }, []);

  const getWebsiteList = async () => {
    const websites = await axios.get("/api/website?websiteOnly=true");
    setWebsiteList(websites?.data);
  };

  const getWebsiteAnalyticalDetail = async () => {
    if (!formData?.fromDate) {
      return;
    }

    setLoading(true);
    const fromDate = format(formData.fromDate, "yyyy-MM-dd");
    const toDate = formData?.toDate
      ? format(formData.toDate, "yyyy-MM-dd")
      : fromDate;
    const websiteResult = await axios.get(
      `/api/website?websiteId=${websiteId}&from=${fromDate}&to=${toDate}`
    );
    setWebsiteInfo(websiteResult.data[0]);
    setLoading(false);
    getLiveUsers();
  };

  const getLiveUsers = async () => {
    const result = await axios.get("/api/live?websiteId=" + websiteId);
    setLiveUser(result.data);
  };

  useEffect(() => {
    getWebsiteAnalyticalDetail();
  }, [formData?.fromDate, formData?.toDate]);

  const currentWebsite = websiteList.find(w => w.websiteId === websiteId);
  const domain = currentWebsite?.domain?.replace("https://", "").replace("http://", "") || "";

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-blue-500 rounded-lg p-3 shadow-sm">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-normal bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {domain || 'Website Analytics'}
            </h1>
            <div className="flex items-center space-x-4 mt-2">
              <p className="text-lg text-gray-600">
                Real-time analytics and insights
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                <span className="text-sm text-green-800 font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <FormInput
          websiteList={websiteList}
          setFormData={setFormData}
          setReloadData={() => getWebsiteAnalyticalDetail()}
        />
      </div>

      {/* Analytics Section */}
      <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <PageViewAnalytics
          WebsiteInfo={websiteInfo}
          loading={loading}
          analyticType={formData?.analyticType}
          liveUserCount={liveUser?.length}
        />
      </div>

      {/* Widgets Section */}
      <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SourceWidget
            websiteAnalytics={websiteInfo?.analytics}
            loading={loading}
          />
          
          {/* Additional widget placeholder for future features */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-500 rounded-lg p-2">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">More Analytics</h3>
            </div>
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Additional analytics widgets coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetail;
