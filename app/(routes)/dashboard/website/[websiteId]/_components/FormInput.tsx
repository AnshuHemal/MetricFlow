import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WebsiteType } from "@/configs/type";
import { format } from "date-fns-tz";
import { CalendarIcon, RefreshCcw, Settings, Globe, Clock, BarChart3 } from "lucide-react";
import { LoadingLink } from "@/components/ui/loading-link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  websiteList: WebsiteType[];
  setFormData: any;
  setReloadData: any;
};

const FormInput = ({ websiteList, setFormData, setReloadData }: Props) => {
  const { websiteId } = useParams();
  const today = new Date();
  const [analyticType, setAnalyticType] = useState<string>("hourly");
  const [date, setDate] = useState<DateRange>({
    from: today,
  });

  const router = useRouter();

  const handleDateChange = (range?: DateRange) => {
    if (!range?.from) return;

    if (range?.from && !range?.to) {
      setDate({ from: range.from });
      return;
    }
    setDate({ from: range.from, to: range.to });
  };

  const handleToday = () => {
    setDate({ from: today });
  };

  const handleReset = () => {
    setDate({ from: today });
  };

  useEffect(() => {
    setFormData({
      analyticType,
      fromDate: date?.from ?? today,
      toDate: date?.to ?? today,
    });
  }, [date, analyticType]);

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 justify-between">
          {/* Left side controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
            {/* Website Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <span>Website</span>
              </label>
              <Select
                value={(websiteId as string) || ""}
                onValueChange={(v) => router.push("/dashboard/website/" + v)}
              >
                <SelectTrigger className="w-[280px] transition-all duration-300 hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <SelectValue placeholder="Select a Website" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-blue-600 font-medium">Your Websites</SelectLabel>
                    {websiteList?.map((website) => (
                      <SelectItem key={website.id} value={website.websiteId} className="cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span>{website.domain.replace("https://", "").replace("http://", "")}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-green-700" />
                <span>Date Range</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className={`data-[empty=true]:text-muted-foreground justify-start text-left font-normal transition-all duration-300 hover:border-green-600 focus:ring-2 focus:ring-green-700 focus:border-transparent ${
                      date?.to ? "w-[380px]" : "w-[280px]"
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date?.to ? (
                        <>
                          {format(date?.from, "MMM dd")} - {format(date?.to, "MMM dd, yyyy")}
                        </>
                      ) : (
                        <>{format(date?.from, "MMM dd, yyyy")}</>
                      )
                    ) : (
                      <span>Pick a Date Range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 shadow-xl border-0">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleToday}
                        className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors duration-200"
                      >
                        Today
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleReset}
                        className="hover:bg-gray-100 transition-colors duration-200"
                      >
                        Reset
                      </Button>
                    </div>
                    <Calendar
                      mode="range"
                      selected={date}
                      className="w-[320px] p-4"
                      onSelect={handleDateChange}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Analytics Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                <span>View</span>
              </label>
              <Select
                value={analyticType}
                onValueChange={(value) => setAnalyticType(value)}
              >
                <SelectTrigger className="w-[140px] transition-all duration-300 hover:border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="hourly" className="cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Hourly</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="daily" className="cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        <span>Daily</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setReloadData(true)}
              className="hover:scale-105 hover:shadow-md transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 cursor-pointer group"
            >
              <RefreshCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              Refresh
            </Button>
            
            <LoadingLink 
              href={"/dashboard/website/" + websiteId + "/settings"}
              loadingText="Loading settings..."
            >
              <Button 
                variant="outline"
                className="hover:scale-105 hover:shadow-md transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer group"
              >
                <Settings className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                Settings
              </Button>
            </LoadingLink>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormInput;
