"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

const Dashboard = () => {
  const [websiteList, setWebsiteList] = useState([]);
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">My Website</h2>
        <Button>+ Website</Button>
      </div>
      <div>
        {websiteList?.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 p-8 border-2 border-dashed rounded-2xl mt-5">
            <Image src={""} alt="website" width={100} height={100} />
            <h2>You don't have any website added for tracking !!</h2>
            <Button>+ Website</Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
