import { NextResponse } from "next/server";
import { z } from "zod";

import { createContactRequest } from "@/lib/cms/store";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.email(),
  message: z.string().min(5),
  source: z.string().min(2)
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const record = await createContactRequest(parsed.data);
  return NextResponse.json(record, { status: 201 });
}
