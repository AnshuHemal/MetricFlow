import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try {
        const { db } = await import("@/configs/db");
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        if (!user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json(
                { error: "User email address not available" },
                { status: 400 }
            );
        }

        const email = user.primaryEmailAddress.emailAddress;
        const name = user.fullName || user.firstName || user.username || "Unknown User";

        // Check if user already exists
        const existingUsers = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (existingUsers.length > 0) {
            return NextResponse.json({
                ...existingUsers[0],
                message: "User already exists"
            });
        }

        // Insert new user
        const insertedUsers = await db
            .insert(usersTable)
            .values({
                name: name,
                email: email,
            })
            .returning();

        return NextResponse.json({
            ...insertedUsers[0],
            message: "User created successfully"
        });
    } catch (error: unknown) {
        console.error('User API error:', error);
        
        if (error instanceof Error) {
            return NextResponse.json({ 
                error: "Server error", 
                message: error.message,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            }, { status: 500 });
        }
        
        return NextResponse.json({ 
            error: "Unknown server error" 
        }, { status: 500 });
    }
}
