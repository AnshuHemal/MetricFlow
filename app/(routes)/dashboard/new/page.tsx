"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Globe, Code } from "lucide-react";
import React, { useEffect, useState } from "react";
import WebsiteForm from "./_components/WebsiteForm";
import ScriptForm from "./_components/ScriptForm";
import { LoadingLink } from "@/components/ui/loading-link";
import { useSearchParams } from "next/navigation";

const AddWebsite = () => {
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const websiteId = searchParams.get('websiteId');
  const domain = searchParams.get('domain');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isScriptStep = step === 'script' && websiteId && domain;

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full opacity-25 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-16 w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Header Section */}
        <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between mb-6">
                <LoadingLink href="/dashboard" loadingText="Returning to dashboard...">
                  <Button 
                    variant="outline" 
                    className="hover:scale-105 hover:shadow-md transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Dashboard
                  </Button>
                </LoadingLink>

                {/* Step Indicator */}
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 transition-all duration-300 ${!isScriptStep ? 'text-blue-600' : 'text-green-800'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${!isScriptStep ? 'bg-blue-100 border-2 border-blue-500' : 'bg-green-200 border-2 border-green-700'}`}>
                      {!isScriptStep ? (
                        <Globe className="h-4 w-4" />
                      ) : (
                        <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-sm">Website Details</span>
                  </div>

                  <div className={`w-8 h-0.5 transition-all duration-300 ${isScriptStep ? 'bg-green-700' : 'bg-gray-300'}`}></div>

                  <div className={`flex items-center space-x-2 transition-all duration-300 ${isScriptStep ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isScriptStep ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border-2 border-gray-300'}`}>
                      <Code className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">Install Script</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-3xl font-normal text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {isScriptStep ? 'Install Tracking Script' : 'Add New Website'}
                </h1>
                <p className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  {isScriptStep 
                    ? 'Copy and paste the tracking script to start collecting analytics data'
                    : 'Enter your website details to start tracking visitor analytics and insights'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {isScriptStep ? (
                  <ScriptForm websiteId={websiteId} domain={domain} />
                ) : (
                  <WebsiteForm />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWebsite;
