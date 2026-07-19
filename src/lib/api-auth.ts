import { auth } from "./auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * Get the current authenticated session from Better Auth.
 * Returns null if no valid session.
 */
export async function getSession() {
    const session = await auth.api.getSession({ headers: await headers() });
    return session;
}

/**
 * Require an authenticated user. Returns either the session or a 401 NextResponse.
 * Usage:
 *   const sessionOrResponse = await requireAuth();
 *   if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
 *   const { user } = sessionOrResponse;
 */
export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized. Please sign in." },
            { status: 401 }
        );
    }
    return session;
}
