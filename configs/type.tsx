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
  last24hVisitors: number;
  hourlyVisitors: HourlyVisitorsType[];
};

export type HourlyVisitorsType = {
  count: number;
  date: string;
  hour: number;
  hourLabel: string;
};
