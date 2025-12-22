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
import { CalendarIcon, RefreshCcw, Settings } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

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
    <div className="flex items-center gap-5 justify-between">
      <div className="flex items-center gap-5">
        <Select
          value={(websiteId as string) || ""}
          onValueChange={(v) => router.push("/dashboard/website/" + v)}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select a Website" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Website</SelectLabel>
              {websiteList?.map((website) => (
                <SelectItem key={website.id} value={website.websiteId}>
                  {website.domain.replace("https://", "")}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className={`data-[empty=true]:text-muted-foreground justify-start text-left font-normal ${
                date?.to ? "w-[380px]" : "w-[220px]"
              }`}
            >
              <CalendarIcon />
              {date?.from ? (
                date?.to ? (
                  <>
                    {format(date?.from, "PPP")} - {format(date?.to, "PPP")}
                  </>
                ) : (
                  <>{format(date?.from, "PPP")}</>
                )
              ) : (
                <span>Pick a Date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <div className="flex justify-between items-center my-3 px-2">
              <Button variant={"outline"} onClick={handleToday}>
                Today
              </Button>
              <Button variant={"outline"} onClick={handleReset}>
                Reset
              </Button>
            </div>
            <Calendar
              mode="range"
              selected={date}
              className="w-[280px]"
              onSelect={handleDateChange}
            />
          </PopoverContent>
        </Popover>

        <Select
          value={analyticType}
          onValueChange={(value) => setAnalyticType(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="hourly">Daily</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant={"outline"} onClick={() => setReloadData(true)}>
          <RefreshCcw />
        </Button>
      </div>
      <Button variant={"outline"}>
        <Settings />
      </Button>
    </div>
  );
};

export default FormInput;
