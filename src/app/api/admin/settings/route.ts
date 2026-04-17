import { NextResponse } from "next/server";

import { isAdminAuthorized } from "@/lib/admin/auth";
import { updateCompanySettings } from "@/lib/cms/store";

export async function PUT(request: Request) {
  if (!(await isAdminAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const settings = await updateCompanySettings(body);
  return NextResponse.json(settings);
}
