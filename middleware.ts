import { NextRequest, NextResponse } from "next/server";
export const config = { matcher: ["/admin/:path*"] };
export function middleware(req: NextRequest) {
  const b64 = (req.headers.get("authorization") ?? "").split(" ")[1];
  const cred = b64 ? atob(b64) : "";
  const i = cred.indexOf(":");
  const ok = !!process.env.ADMIN_PASSWORD && cred.slice(0, i) === process.env.ADMIN_USER && cred.slice(i + 1) === process.env.ADMIN_PASSWORD;
  return ok ? NextResponse.next() : new NextResponse("Authentication required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="UNDERATED admin"' } });
}
