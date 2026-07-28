import { createServiceClient } from "@/lib/supabase/server";

/**
 * Supabase admin client for server-side database operations.
 * Uses the service_role key to bypass RLS for trusted server code.
 *
 * This replaces the previous Prisma client.
 * For user-scoped operations in Route Handlers, use createClient() from
 * @/lib/supabase/server instead (which respects RLS).
 */
export function getAdminDb() {
  return createServiceClient();
}
