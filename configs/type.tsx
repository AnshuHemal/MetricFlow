export type WebsiteType = {
  id: number;
  websiteId: string;
  domain: string;
  timezone: string;
  enableLocalhostTracking: boolean;
  userEmail: string;
};

export type WebsiteInfoType = {
  website: WebsiteType;
  analytics: AnalyticsType;
};

export type AnalyticsType = {
  avgActiveTime: number;
  totalActiveTime: number;
  totalSessions: number;
  totalVisitors: number;
  hourlyVisitors: HourlyVisitorsType[];
  dailyVisitors: DailyVisitorsType[];
};

export type HourlyVisitorsType = {
  count: number;
  date: string;
  hour: number;
  hourLabel: string;
};

export type DailyVisitorsType = {
  date: string;
  count: number;
};
