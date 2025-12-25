"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Globe, Code } from "lucide-react";
import React, { useEffect, useState, Suspense } from "react";
import WebsiteForm from "./_components/WebsiteForm";
import ScriptForm from "./_components/ScriptForm";
import { LoadingLink } from "@/components/ui/loading-link";
import { useSearchParamsSafe } from "@/hooks/use-search-params-safe";

// Loading component for Suspense fallback
function PageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// Separate component for search params logic
function AddWebsiteContent() {
  const [isVisible, setIsVisible] = useState(false);
  const { mounted, get } = useSearchParamsSafe();
  
  // Only access search params after component is mounted
  const step = get('step');
  const websiteId = get('websiteId');
  const domain = get('domain');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isScriptStep = step === 'script' && websiteId && domain;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full opacity-30 animate-float"></div>
        <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full opacity-25 animate-float-delayed"></div>
        <div className="absolute top-1/2 right-16 w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full opacity-20 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Header Section */}
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between mb-6">
                <LoadingLink href="/dashboard" loadingText="Returning to dashboard...">
                  <Button 
                    variant="outline" 
                    className="hover:scale-105 hover:shadow-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer group"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Dashboard
                  </Button>
                </LoadingLink>

                {/* Step Indicator */}
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 transition-all duration-300 ${!isScriptStep ? 'text-blue-600 dark:text-blue-400' : 'text-green-800 dark:text-green-300'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${!isScriptStep ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400' : 'bg-green-200 dark:bg-green-900/30 border-2 border-green-700 dark:border-green-400'}`}>
                      {!isScriptStep ? (
                        <Globe className="h-4 w-4" />
                      ) : (
                        <div className="w-2 h-2 bg-green-700 dark:bg-green-400 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-sm">Website Details</span>
                  </div>

                  <div className={`w-8 h-0.5 transition-all duration-300 ${isScriptStep ? 'bg-green-700 dark:bg-green-400' : 'bg-gray-300 dark:bg-gray-600'}`}></div>

                  <div className={`flex items-center space-x-2 transition-all duration-300 ${isScriptStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isScriptStep ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400' : 'bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'}`}>
                      <Code className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">Install Script</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-3xl font-normal text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {isScriptStep ? 'Install Tracking Script' : 'Add New Website'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200">
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
                {mounted && isScriptStep ? (
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
}

// Main page component with proper Suspense boundary
export default function AddWebsite() {
  return (
    <Suspense fallback={<PageLoading />}>
      <AddWebsiteContent />
    </Suspense>
  );
}
