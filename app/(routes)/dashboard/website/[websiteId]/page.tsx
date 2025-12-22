"use client";
import { WebsiteInfoType, WebsiteType } from "@/configs/type";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormInput from "./_components/FormInput";
import PageViewAnalytics from "./_components/PageViewAnalytics";
import { FakePrimitiveParam } from "drizzle-orm";
import { format } from "date-fns-tz";
import SourceWidget from "./_components/SourceWidget";

const WebsiteDetail = () => {
  const { websiteId } = useParams();
  const [websiteList, setWebsiteList] = useState<WebsiteType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfoType | null>();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    getWebsiteList();
    getWebsiteAnalyticalDetail();
  }, []);

  const getWebsiteList = async () => {
    const websites = await axios.get("/api/website?websiteOnly=true");
    setWebsiteList(websites?.data);
  };

  const getWebsiteAnalyticalDetail = async () => {
    setLoading(true);
    const fromDate = format(formData?.fromDate, "yyyy-MM-dd");
    const toDate = formData?.toDate
      ? format(formData?.toDate, "yyyy-MM-dd")
      : fromDate;
    const websiteResult = await axios.get(
      `/api/website?websiteId=${websiteId}&from=${fromDate}&to=${toDate}`
    );
    setWebsiteInfo(websiteResult.data[0]);
    setLoading(false);
  };

  useEffect(() => {
    getWebsiteAnalyticalDetail();
  }, [formData?.fromDate, formData?.toDate]);

  return (
    <div className="mt-10">
      <FormInput
        websiteList={websiteList}
        setFormData={setFormData}
        setReloadData={() => getWebsiteAnalyticalDetail()}
      />
      <PageViewAnalytics
        WebsiteInfo={websiteInfo}
        loading={loading}
        analyticType={formData?.analyticType}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <SourceWidget websiteAnalytics={websiteInfo?.analytics} loading={loading} />
      </div>
    </div>
  );
};

export default WebsiteDetail;
