import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export type AuthSession = {
  user: {
    id: string;
    email: string;
  };
};

/**
 * Get the current authenticated session from Supabase Auth.
 * Returns null if no valid session.
 */
export async function getSession(): Promise<AuthSession | null> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  return {
    user: {
      id: user.id,
      email: user.email ?? "",
    },
  };
}

/**
 * Require an authenticated user. Returns either the session or a 401 NextResponse.
 * Usage:
 *   const sessionOrResponse = await requireAuth();
 *   if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
 *   const { user } = sessionOrResponse;
 */
export async function requireAuth(): Promise<AuthSession | NextResponse> {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 },
    );
  }
  return session;
}
