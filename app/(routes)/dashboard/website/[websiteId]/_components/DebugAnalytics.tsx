"use client";

import { WebsiteInfoType } from "@/configs/type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Code, Eye, EyeOff } from "lucide-react";

type Props = {
  WebsiteInfo: WebsiteInfoType | undefined | null;
};

const DebugAnalytics = ({ WebsiteInfo }: Props) => {
  const [showDebug, setShowDebug] = useState(false);

  // Temporarily enable in production for debugging
  // if (process.env.NODE_ENV === 'production') {
  //   return null; // Don't show in production
  // }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="h-4 w-4 text-orange-600" />
            <CardTitle className="text-sm font-medium text-orange-800">
              Debug Analytics Data
            </CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDebug(!showDebug)}
            className="text-orange-600 border-orange-300 hover:bg-orange-100"
          >
            {showDebug ? (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Hide
              </>
            ) : (
              <>
                <Eye className="h-3 w-3 mr-1" />
                Show
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {showDebug && (
        <CardContent className="pt-0">
          <div className="bg-white rounded-lg p-4 border border-orange-200">
            <pre className="text-xs text-gray-700 overflow-auto max-h-96">
              {JSON.stringify(WebsiteInfo, null, 2)}
            </pre>
          </div>
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-orange-700 font-medium">Website Info:</span>
              <span className="text-gray-600">
                {WebsiteInfo ? 'Present' : 'Missing'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-orange-700 font-medium">Analytics Data:</span>
              <span className="text-gray-600">
                {WebsiteInfo?.analytics ? 'Present' : 'Missing'}
              </span>
            </div>
            
            {WebsiteInfo?.analytics && (
              <>
                <div className="flex justify-between">
                  <span className="text-orange-700 font-medium">Total Visitors:</span>
                  <span className="text-gray-600">
                    {WebsiteInfo.analytics.totalVisitors ?? 'undefined'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-orange-700 font-medium">Total Sessions:</span>
                  <span className="text-gray-600">
                    {WebsiteInfo.analytics.totalSessions ?? 'undefined'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-orange-700 font-medium">Total Active Time:</span>
                  <span className="text-gray-600">
                    {WebsiteInfo.analytics.totalActiveTime ?? 'undefined'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-orange-700 font-medium">Avg Active Time:</span>
                  <span className="text-gray-600">
                    {WebsiteInfo.analytics.avgActiveTime ?? 'undefined'}
                  </span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default DebugAnalytics;