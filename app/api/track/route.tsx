import { db } from "@/configs/db";
import { pageViewTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parser = new UAParser(req.headers.get("user-agent") || "");
  const deviceInfo = parser.getDevice()?.model;
  const osInfo = parser.getOS()?.name;
  const browserInfo = parser.getBrowser()?.name;
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "71.71.22.54";

  const geoRes = await fetch(`https://ip-api.com/json/${ip}/`);
  const geoInfo = await geoRes.json();

  let result;
  if (body?.type === "entry") {
    result = await db
      .insert(pageViewTable)
      .values({
        visitorId: body.visitorId,
        websiteId: body.visitorId,
        domain: body.domain,
        url: body.url,
        type: body.type,
        referrer: body.referrer,
        entryTime: body.entryTime,
        exitTime: body.exitTime,
        totalActiveTime: body.totalActiveTime,
        urlParams: body.urlParams,
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        utm_term: body.utm_term,
        utm_content: body.utm_content,
        device: deviceInfo,
        os: osInfo,
        browser: browserInfo,
        city: geoInfo.city,
        region: geoInfo.regionName,
        country: geoInfo.country,
        countryCode: geoInfo.countryCode,
        ipAddress: ip || "",
        refParams: body.refParams,
      })
      .returning();
  } else {
    await db.update(pageViewTable).set({
      exitTime: body.exitTime,
      totalActiveTime: body.totalActiveTime,
      exitUrl: body.exitUrl,
    }).where(eq(pageViewTable.visitorId, body?.visitorId)).returning();
  }

  return NextResponse.json({
    message: "Data received successfully",
    data: result,
  });
}
