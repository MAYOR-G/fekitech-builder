import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const handler = async (request: NextRequest) => {
  return auth.handler(request);
};

export { handler as GET, handler as POST };
