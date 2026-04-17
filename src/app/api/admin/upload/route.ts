import { promises as fs } from "fs";
import path from "path";

import { NextResponse } from "next/server";

import { isAdminAuthorized } from "@/lib/admin/auth";
import { uid } from "@/lib/utils";

export async function POST(request: Request) {
  if (!(await isAdminAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File not found" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".bin";
  const fileName = `${uid("media")}${ext}`;
  const outputDir = path.join(process.cwd(), "public", "uploads");
  const outputPath = path.join(outputDir, fileName);

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, bytes);

  return NextResponse.json({
    url: `/uploads/${fileName}`
  });
}
