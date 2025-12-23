"use client"
import AppHeader from "@/app/_components/AppHeader";
import React from "react";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full opacity-25 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <AppHeader />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardProvider;
