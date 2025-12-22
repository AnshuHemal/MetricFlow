import React from "react";
import DashboardProvider from "./provider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardProvider>{children}</DashboardProvider>
    </div>
  );
};

export default DashboardLayout;
