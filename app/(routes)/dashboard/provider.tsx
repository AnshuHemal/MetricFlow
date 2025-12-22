"use client"
import AppHeader from "@/app/_components/AppHeader";
import React from "react";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-10 md:px-28 lg:px-36 xl:px-48">
      <AppHeader />
      {children}
    </div>
  );
};

export default DashboardProvider;
