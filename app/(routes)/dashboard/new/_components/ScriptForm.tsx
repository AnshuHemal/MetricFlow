import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Button } from "@/components/ui/button";
import { LoadingLink } from "@/components/ui/loading-link";
import { Copy, Code, CheckCircle, ArrowRight, ExternalLink, Lightbulb, Rocket, Globe, Shield } from "lucide-react";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
  websiteId: string;
  domain: string;
};

const ScriptForm = ({ websiteId, domain }: Props) => {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const Script = `<script defer data-website-id='${websiteId}' data-domain='${domain}' src="${process.env.NEXT_PUBLIC_HOST_URL}/analytics.js"></script>`;

  const onCopy = () => {
    navigator.clipboard.writeText(Script);
    setCopied(true);
    toast.success("Script copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6 animate-fade-in-up">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-500 rounded-full p-2">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-blue-800 font-semibold">Website Created Successfully!</h3>
            <p className="text-blue-700 text-sm">Your website has been added to MetricFlow. Complete the setup below.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Script Card */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden group">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
            
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 shadow-lg transition-all duration-500">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Install Tracking Script
                  </CardTitle>
                  <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200 mt-1">
                    Add this script to your website's HTML to start tracking
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <Separator className="opacity-20" />

            <CardContent className="relative z-10 pt-6 space-y-6">
              {/* Script Display */}
              <div className="relative group/code">
                <div className="rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-colors duration-300 shadow-sm">
                  <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-700 rounded-full"></div>
                      </div>
                      <span className="text-gray-400 text-sm font-mono">analytics.html</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`transition-all duration-300 hover:scale-105 cursor-pointer text-xs px-3 py-1 ${
                        copied 
                          ? 'text-blue-400 hover:text-blue-300 bg-blue-900/20' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                      }`}
                      onClick={onCopy}
                    >
                      {copied ? (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Copied!</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </div>
                      )}
                    </Button>
                  </div>
                  <SyntaxHighlighter
                    customStyle={{ 
                      borderRadius: 0,
                      margin: 0,
                      fontSize: '14px',
                      lineHeight: '1.5',
                      paddingTop: '1rem',
                      paddingBottom: '1rem'
                    }}
                    language="html"
                    style={a11yDark}
                  >
                    {Script}
                  </SyntaxHighlighter>
                </div>
              </div>

              {/* Installation Steps */}
              <div className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100/50 transition-colors duration-300">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-blue-800">Installation Steps</span>
                </div>
                <div className="space-y-3">
                  {[
                    { step: 1, text: "Copy the script code above", icon: Copy },
                    { step: 2, text: "Paste it in the <head> section of your HTML", icon: Code },
                    { step: 3, text: "Deploy your website and start tracking!", icon: Rocket }
                  ].map(({ step, text, icon: Icon }) => (
                    <div key={step} className="flex items-center space-x-3 group/step">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold group-hover/step:scale-110 transition-transform duration-200">
                        {step}
                      </div>
                      <div className="flex items-center space-x-2 flex-1">
                        <Icon className="h-4 w-4 text-blue-600 group-hover/step:animate-bounce" />
                        <span className="text-blue-700 group-hover/step:text-blue-800 transition-colors duration-200">{text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>

            {/* Floating particles */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-blue-200 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 right-12 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '1s' }}></div>
          </Card>
        </div>

        {/* Sidebar Info Cards */}
        <div className="space-y-6">
          {/* Website Info Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
            
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 group-hover:scale-110 transition-all duration-300">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Website Details
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Domain</p>
                <p className="text-gray-900 font-semibold break-all">{domain.replace('https://', '').replace('http://', '')}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Website ID</p>
                <p className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded border">
                  {websiteId.slice(0, 8)}...
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-600 font-medium">Ready for tracking</span>
              </div>
            </CardContent>

            {/* Floating particles */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-blue-200 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
          </Card>

          {/* Security Info Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300"></div>
            
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-2 group-hover:scale-110 transition-all duration-300">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                  Privacy & Security
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>No Personal Data Stored</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Lightweight Script</span>
                </div>
              </div>
            </CardContent>

            {/* Floating particles */}
            <div className="absolute top-6 right-6 w-2 h-2 bg-purple-200 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-pink-300 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <LoadingLink href="/dashboard" loadingText="Returning to dashboard...">
          <Button className="w-auto px-8 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 hover:shadow-lg cursor-pointer group py-3 text-base font-medium">
            <CheckCircle className="mr-2 h-5 w-5 group-hover:animate-bounce" />
            Complete Setup
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </LoadingLink>
        
        <Button 
          variant="outline" 
          className="hover:scale-105 hover:shadow-md transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 cursor-pointer group py-3 px-6"
          onClick={() => window.open(domain, '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
          Visit Website
        </Button>
      </div>
    </div>
  );
};

export default ScriptForm;
