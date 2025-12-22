"use client";
import { Button } from "@/components/ui/button";
import { WebsiteType } from "@/configs/type";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import WebsiteCard from "./_components/WebsiteCard";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [websiteList, setWebsiteList] = useState<WebsiteType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserWebsites();
  }, []);

  const getUserWebsites = async () => {
    setLoading(true);
    const result = await axios.get("/api/website");
    setWebsiteList(result?.data);
    setLoading(false);
  };
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">My Website</h2>
        <Link href={"/dashboard/new"}>
          <Button>+ Website</Button>
        </Link>
      </div>
      <div>
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4].map((item, index) => (
              <div className="p-4" key={index}>
                <div className="flex gap-2 items-center">
                  <Skeleton className="h-8 w-8 rounded-sm" />
                  <Skeleton className="h-8 w-1/2 rounded-sm" />
                </div>
                <Skeleton className="h-[80px] w-full mt-4" />
              </div>
            ))}
          </div>
        )}
        {!loading && websiteList?.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 p-8 border-2 border-dashed rounded-2xl mt-5">
            <Image src={""} alt="website" width={100} height={100} />
            <h2>You don't have any website added for tracking !!</h2>
            <Link href={"/dashboard/new"}>
              <Button>+ Website</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:grid-cols-3  mt-5">
            {websiteList?.map((website, index) => (
              <WebsiteCard key={index} website={website} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
