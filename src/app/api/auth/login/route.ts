import { NextResponse } from "next/server";

import { createAdminSession, validateAdminCredentials } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (!(await validateAdminCredentials(body.email ?? "", body.password ?? ""))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true });
}
