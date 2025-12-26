import { pageViewTable, websitesTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { db } = await import("@/configs/db");
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const websiteId = req.nextUrl.searchParams.get("websiteId");
    
    if (!websiteId) {
      return NextResponse.json({ error: "Website ID required" }, { status: 400 });
    }

    // Get website info
    const website = await db
      .select()
      .from(websitesTable)
      .where(eq(websitesTable.websiteId, websiteId))
      .limit(1);

    // Get page views with correct websiteId
    const correctViews = await db
      .select()
      .from(pageViewTable)
      .where(eq(pageViewTable.websiteId, websiteId))
      .limit(5);

    // Get page views that might have the bug (websiteId = visitorId)
    const potentialBuggedViews = website.length > 0 ? await db
      .select()
      .from(pageViewTable)
      .where(
        and(
          eq(pageViewTable.domain, website[0].domain),
          eq(pageViewTable.websiteId, pageViewTable.visitorId)
        )
      )
      .limit(5) : [];

    // Get all views for this domain (regardless of websiteId)
    const allDomainViews = website.length > 0 ? await db
      .select()
      .from(pageViewTable)
      .where(eq(pageViewTable.domain, website[0].domain))
      .limit(5) : [];

    return NextResponse.json({
      websiteId,
      website: website[0] || null,
      correctViews: {
        count: correctViews.length,
        data: correctViews.map(v => ({
          id: v.id,
          visitorId: v.visitorId,
          websiteId: v.websiteId,
          entryTime: v.entryTime,
          totalActiveTime: v.totalActiveTime,
          url: v.url,
          domain: v.domain
        }))
      },
      potentialBuggedViews: {
        count: potentialBuggedViews.length,
        data: potentialBuggedViews.map(v => ({
          id: v.id,
          visitorId: v.visitorId,
          websiteId: v.websiteId,
          entryTime: v.entryTime,
          totalActiveTime: v.totalActiveTime,
          url: v.url,
          domain: v.domain
        }))
      },
      allDomainViews: {
        count: allDomainViews.length,
        data: allDomainViews.map(v => ({
          id: v.id,
          visitorId: v.visitorId,
          websiteId: v.websiteId,
          entryTime: v.entryTime,
          totalActiveTime: v.totalActiveTime,
          url: v.url,
          domain: v.domain
        }))
      }
    });

  } catch (error) {
    console.error('Debug analytics error:', error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: String(error)
    }, { status: 500 });
  }
}