import { db } from "@/configs/db";
import { websitesTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { websiteId, domain, timezone, enableLocalhostTracking } =
    await req.json();

  const user = await currentUser();

  const existingDomain = await db
    .select()
    .from(websitesTable)
    .where(
      and(
        eq(websitesTable?.domain, domain),
        eq(
          websitesTable?.userEmail,
          user?.primaryEmailAddress?.emailAddress as string
        )
      )
    );

  if (existingDomain.length > 0) {
    return NextResponse.json({
      message: "Domain already exists !",
      data: existingDomain[0],
    });
  }

  const result = await db
    .insert(websitesTable)
    .values({
      domain,
      websiteId,
      timezone,
      enableLocalhostTracking,
      userEmail: user?.primaryEmailAddress?.emailAddress as string,
    })
    .returning();

  return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
  const user = await currentUser();

  const result = await db
    .select()
    .from(websitesTable)
    .where(
      eq(
        websitesTable.userEmail,
        user?.primaryEmailAddress?.emailAddress as string
      )
    )
    .orderBy(desc(websitesTable.id));

  return NextResponse.json(result);
}
