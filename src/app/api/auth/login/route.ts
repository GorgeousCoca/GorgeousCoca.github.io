import { NextResponse } from "next/server";

import { createAdminSession, validateAdminCredentials } from "@/lib/admin/auth";
import { getClientIp } from "@/lib/security/request";
import { checkRateLimit } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const ip = getClientIp(request);
  const identifier = (body.email ?? "").trim().toLowerCase();
  const limit = checkRateLimit({
    key: `auth-login:${ip}:${identifier}`,
    maxRequests: 7,
    windowMs: 10 * 60 * 1000,
    blockMs: 20 * 60 * 1000
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSec)
        }
      }
    );
  }

  if (!(await validateAdminCredentials(body.email ?? "", body.password ?? ""))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
