import { db } from "@/configs/db";
import { liveUserTable } from "@/configs/schema";
import { and, eq, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin") || "*";

  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitorId, websiteId, last_seen, url } = body;

    // 1️⃣ Parse device info from User-Agent
    const parser = new UAParser(req.headers.get("user-agent") || "");
    const deviceInfo = parser.getDevice()?.model || "";
    const osInfo = parser.getOS()?.name || "";
    const browserInfo = parser.getBrowser()?.name || "";

    // 2️⃣ Get IP from headers (or fallback)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "71.71.22.54"; // fallback IP

    // 3️⃣ Fetch geo-location info from IP
    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const geoInfo = await geoRes.json();

    // 4️⃣ Upsert into liveUser table
    await db
      .insert(liveUserTable)
      .values({
        visitorId,
        websiteId,
        last_seen,
        city: geoInfo.city || "",
        region: geoInfo.regionName || "",
        country: geoInfo.country || "",
        countryCode: geoInfo.countryCode || "",
        lat: geoInfo.lat?.toString() || "",
        lng: geoInfo.lon?.toString() || "",
        device: deviceInfo,
        os: osInfo,
        browser: browserInfo,
      })
      .onConflictDoUpdate({
        target: liveUserTable.visitorId,
        set: {
          last_seen,
          city: geoInfo.city || "",
          region: geoInfo.regionName || "",
          country: geoInfo.country || "",
          countryCode: geoInfo.countryCode || "",
          lat: geoInfo.lat?.toString() || "",
          lng: geoInfo.lon?.toString() || "",
          device: deviceInfo,
          os: osInfo,
          browser: browserInfo,
        },
      });

    return NextResponse.json(
      { message: "Data received successfully" },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    console.error(err);
    {
      headers: CORS_HEADERS;
    }
    return NextResponse.json(
      { status: "error", message: err.message },
      { headers: CORS_HEADERS }
    );
  }
}

export async function GET(req: NextRequest) {
  const websiteId = req.nextUrl.searchParams.get("websiteId");
  const now = Date.now();
  const activeUsers = await db
    .select()
    .from(liveUserTable)
    //@ts-ignore
    .where(
      and(
        // @ts-ignore
        gt(liveUserTable.last_seen, now - 30_000),
        eq(liveUserTable.websiteId, websiteId as string)
      )
    ); // last 30 seconds

  return NextResponse.json(activeUsers);
}
