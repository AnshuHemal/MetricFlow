"use client";
import { Button } from "@/components/ui/button";
import { WebsiteType } from "@/configs/type";
import axios from "axios";
import { 
  ArrowLeft, 
  Copy, 
  Trash, 
  Settings, 
  Globe, 
  Code, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Save
} from "lucide-react";
import { useParams } from "next/navigation";
import { useLoadingRouter } from "@/hooks/use-loading-router";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import { useApi } from "@/hooks/use-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SyntaxHighlighter from "react-syntax-highlighter";
import { toast } from "sonner";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Input } from "@/components/ui/input";
import { LoadingLink } from "@/components/ui/loading-link";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const WebsiteSettings = () => {
  const { websiteId } = useParams();
  const [websiteDetail, setWebsiteDetail] = useState<WebsiteType>();
  const [websiteDomain, setWebsiteDomain] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const router = useLoadingRouter();
  
  const { loading: deleteLoading, execute: executeDelete } = useApi({
    loadingText: "Deleting website and all associated data...",
    showGlobalLoading: true
  });

  const { loading: saveLoading, execute: executeSave } = useApi({
    loadingText: "Saving domain configuration...",
    showGlobalLoading: false
  });

  useEffect(() => {
    getWebsiteDetail();
  }, []);

  const getWebsiteDetail = async () => {
    const result = await axios.get(
      "/api/website?websiteId=" + websiteId + "&websiteOnly=true"
    );
    setWebsiteDetail(result?.data);
    setWebsiteDomain(result?.data?.domain);
  };

  const Script = `<script defer data-website-id='${websiteId}' data-domain='${websiteDetail?.domain}' src="${process.env.NEXT_PUBLIC_HOST_URL}/analytics.js"></script>`;

  const onCopy = () => {
    navigator.clipboard.writeText(Script);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const onSaveDomain = async () => {
    try {
      await executeSave(async () => {
        // Add your save logic here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        return { success: true };
      }, {
        successMessage: "Domain updated successfully!"
      });
    } catch (error) {
      // Error is handled by useApi hook
    }
  };

  const onDeleteWebsite = async () => {
    try {
      await executeDelete(async () => {
        const response = await axios.delete("/api/website", {
          data: {
            websiteId: websiteId,
          },
        });

        if (response.data.success) {
          return response.data;
        } else {
          throw new Error(response.data.message || "Failed to delete website");
        }
      }, {
        successMessage: `Website "${domain}" and all analytics data permanently removed from MetricFlow`
      });

      // Add a small delay to show the success message before redirecting
      setTimeout(() => {
        router.replace("/dashboard");
      }, 1500);
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in again");
      } else if (error.response?.status === 404) {
        toast.error("Website not found or access denied");
      } else if (error.response?.status === 400) {
        toast.error("Invalid request: Please try again");
      }
      // Other errors are handled by useApi hook
    }
  };

  const domain = websiteDetail?.domain?.replace("https://", "").replace("http://", "") || "";

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <LoadingLink 
          href={`/dashboard/website/${websiteId}`}
          loadingText="Loading analytics..."
        >
          <Button 
            variant="outline" 
            className="hover:shadow-md transition-shadow duration-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Analytics
          </Button>
        </LoadingLink>
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-blue-500 rounded-lg p-3 shadow-sm">
          <Settings className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-normal bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Website Settings
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Configure settings for <span className="font-medium text-blue-600">{domain}</span>
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tracking Script Card */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-700 rounded-lg p-2 shadow-sm">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Tracking Script
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Copy and paste this script into your website's &lt;head&gt; section
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="relative">
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <SyntaxHighlighter
                  customStyle={{ 
                    borderRadius: 0,
                    margin: 0,
                    fontSize: '12px',
                    lineHeight: '1.4'
                  }}
                  language="html"
                  style={a11yDark}
                >
                  {Script}
                </SyntaxHighlighter>
              </div>

              <Button
                variant="outline"
                size="sm"
                className={`absolute top-2 right-2 transition-all duration-200 cursor-pointer ${
                  copied 
                    ? 'bg-green-200 border-green-700 text-green-800 hover:bg-green-300' 
                    : 'bg-white/90 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
                }`}
                onClick={onCopy}
              >
                {copied ? (
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs">Copied!</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1">
                    <Copy className="h-4 w-4" />
                    <span className="text-xs">Copy</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Website Status */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Website ID</p>
                  <p className="text-xs font-mono text-blue-600 bg-white px-2 py-1 rounded border mt-1">
                    {websiteId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-800">Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                    <span className="text-sm text-green-800 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Domain Settings Card */}
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 rounded-lg p-2 shadow-sm">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Domain Configuration
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Update your website domain for analytics tracking
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Website Domain</label>
              <Input
                placeholder="example.com"
                value={websiteDomain}
                onChange={(e) => setWebsiteDomain(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-300"
              />
              <p className="text-xs text-gray-500">
                Enter your domain without the protocol (https://)
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(websiteDomain, '_blank')}
                className="hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Website
              </Button>
              
              <Button 
                onClick={onSaveDomain}
                disabled={saveLoading}
                className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
              >
                {saveLoading ? (
                  <Loading variant="button" size="sm" text="Saving..." />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="border border-red-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-500 rounded-lg p-2 shadow-sm">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-red-900">
                Danger Zone
              </CardTitle>
              <CardDescription className="text-red-600 mt-1">
                Irreversible and destructive actions
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Separator className="opacity-20" />

        <CardContent className="pt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-red-900">Delete Website</h3>
                <p className="text-red-700 max-w-md">
                  Permanently remove this website from MetricFlow. This action cannot be undone and will delete all associated analytics data.
                </p>
                <div className="flex items-center space-x-2 text-sm text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span>This action is permanent and irreversible</span>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="transition-shadow duration-200 hover:shadow-md cursor-pointer text-white"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Website
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-0 shadow-2xl">
                  <AlertDialogHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-red-100 rounded-full p-3">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <AlertDialogTitle className="text-xl text-red-900">
                          Delete Website Permanently?
                        </AlertDialogTitle>
                      </div>
                    </div>
                    <AlertDialogDescription className="text-gray-600 leading-relaxed">
                      This action will permanently delete <span className="font-semibold text-red-600">{domain}</span> from MetricFlow and remove:
                      <br /><br />
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>All visitor analytics and page view data</li>
                        <li>Historical traffic statistics and reports</li>
                        <li>Live user session tracking data</li>
                        <li>All associated tracking configurations</li>
                      </ul>
                      <br />
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                          <span className="text-red-800 font-semibold text-sm">
                            This action cannot be undone and all data will be permanently lost.
                          </span>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="space-x-3">
                    <AlertDialogCancel className="hover:bg-gray-100 transition-colors duration-200">
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      variant="destructive"
                      onClick={onDeleteWebsite}
                      disabled={deleteLoading}
                      className="transition-shadow duration-200 hover:shadow-md cursor-pointer text-white"
                    >
                      {deleteLoading ? (
                        <Loading variant="button" size="sm" text="Deleting..." />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Trash className="h-4 w-4" />
                          <span>Yes, Delete Forever</span>
                        </div>
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteSettings;
