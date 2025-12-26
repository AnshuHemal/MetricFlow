import { pageViewTable, websitesTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { db } = await import("@/configs/db");
    const user = await currentUser();
    
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all websites for this user
    const userWebsites = await db
      .select()
      .from(websitesTable)
      .where(eq(websitesTable.userEmail, user.primaryEmailAddress.emailAddress));

    let fixedRecords = 0;
    let totalProcessed = 0;

    for (const website of userWebsites) {
      // Find page views where websiteId equals visitorId (the bug)
      // and the domain matches this website's domain
      const incorrectRecords = await db
        .select()
        .from(pageViewTable)
        .where(
          and(
            eq(pageViewTable.domain, website.domain),
            eq(pageViewTable.websiteId, pageViewTable.visitorId) // This indicates the bug
          )
        );

      totalProcessed += incorrectRecords.length;

      // Fix each record by setting the correct websiteId
      for (const record of incorrectRecords) {
        await db
          .update(pageViewTable)
          .set({
            websiteId: website.websiteId // Set the correct websiteId
          })
          .where(eq(pageViewTable.id, record.id));
        
        fixedRecords++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Fixed ${fixedRecords} records out of ${totalProcessed} processed`,
      userWebsites: userWebsites.length,
      fixedRecords,
      totalProcessed
    });

  } catch (error) {
    console.error('Fix analytics data error:', error);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: String(error)
    }, { status: 500 });
  }
}