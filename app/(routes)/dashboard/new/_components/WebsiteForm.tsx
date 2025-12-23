"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Globe, Loader2Icon, Plus, Clock, Shield, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const WebsiteForm = () => {
  const [domain, setDomain] = useState("");
  const [timezone, setTimezone] = useState("");
  const [enableLocalhostTracking, setEnableLocalhostTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onFormSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const websiteId = crypto.randomUUID();
    const result = await axios.post("/api/website", {
      websiteId: websiteId,
      domain,
      enableLocalhostTracking,
      timezone,
    });

    if (result.data.data) {
      router.push(
        "/dashboard/new?step=script&websiteId=" +
          result?.data?.data?.websiteId +
          "&domain=" +
          result?.data?.data?.domain
      );
    } else if (!result?.data?.message) {
      router.push(
        "/dashboard/new?step=script&websiteId=" +
          websiteId +
          "&domain=" +
          domain
      );
    } else {
      toast.error(result?.data?.message);
    }
    setLoading(false);
  };

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden group">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300"></div>
        
        <CardHeader className="relative z-10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 shadow-lg transition-all duration-500">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                Website Information
              </CardTitle>
              <p className="text-gray-600 mt-1 group-hover:text-gray-700 transition-colors duration-200">
                Configure your website tracking settings
              </p>
            </div>
          </div>
        </CardHeader>

        <Separator className="opacity-20" />

        <CardContent className="relative z-10 pt-6">
          <form className="space-y-6" onSubmit={(e) => onFormSubmit(e)}>
            {/* Two Column Layout for Desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Domain Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>Website Domain</span>
                </label>
                <InputGroup className="group">
                  <InputGroupInput
                    type="text"
                    onChange={(e) => setDomain("https://" + e.target.value)}
                    placeholder="mywebsite.com"
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent group-hover:border-blue-300"
                  />
                  <InputGroupAddon className="bg-blue-50 border-blue-200 text-blue-600 group-hover:bg-blue-100 transition-colors duration-200 pe-2">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">https://</span>
                  </InputGroupAddon>
                </InputGroup>
                <p className="text-xs text-gray-500">
                  Enter your website domain without the protocol
                </p>
              </div>

              {/* Timezone Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-green-700" />
                  <span>Timezone</span>
                </label>
                <Select required onValueChange={(value) => setTimezone(value)}>
                  <SelectTrigger className="w-full transition-all duration-300 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                  <SelectContent className="max-h-48">
                    <SelectGroup>
                      <SelectLabel className="text-blue-600 font-medium">North America</SelectLabel>
                      <SelectItem value="est">Eastern (EST)</SelectItem>
                      <SelectItem value="cst">Central (CST)</SelectItem>
                      <SelectItem value="mst">Mountain (MST)</SelectItem>
                      <SelectItem value="pst">Pacific (PST)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel className="text-green-800 font-medium">Europe</SelectLabel>
                      <SelectItem value="gmt">Greenwich (GMT)</SelectItem>
                      <SelectItem value="cet">Central European (CET)</SelectItem>
                      <SelectItem value="eet">Eastern European (EET)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel className="text-purple-600 font-medium">Asia</SelectLabel>
                      <SelectItem value="ist">India (IST)</SelectItem>
                      <SelectItem value="jst">Japan (JST)</SelectItem>
                      <SelectItem value="cst_china">China (CST)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  Choose your local timezone for accurate reporting
                </p>
              </div>
            </div>

            {/* Development Options */}
            <div className="bg-gray-50 rounded-lg p-4 hover:bg-blue-50/50 transition-colors duration-300">
              <div className="flex items-center space-x-2 mb-3">
                <Shield className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Development Options</span>
              </div>
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="localhost"
                  onCheckedChange={(value: boolean) => setEnableLocalhostTracking(value)}
                  className="mt-1"
                />
                <div className="space-y-1">
                  <label htmlFor="localhost" className="text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors duration-200">
                    Enable Localhost Tracking
                  </label>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Allow tracking on localhost and development environments for testing.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-101 transition-all duration-300 hover:shadow-lg cursor-pointer group py-3 text-base font-medium" 
              disabled={loading} 
              type="submit"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2Icon className="animate-spin h-5 w-5" />
                  <span>Creating Website...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                  <span>Add Website</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </Button>
          </form>
        </CardContent>

        {/* Floating particles */}
        <div className="absolute top-6 right-6 w-2 h-2 bg-blue-200 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-12 w-1 h-1 bg-green-700 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: '1s' }}></div>
      </Card>
    </div>
  );
};

export default WebsiteForm;
