import { NextResponse } from "next/server";
import { z } from "zod";

import { createContactRequest } from "@/lib/cms/store";
import { sendContactMail } from "@/lib/email";
import { getClientIp } from "@/lib/security/request";
import { checkRateLimit } from "@/lib/security/rate-limit";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.email(),
  source: z.string().min(2),
  productType: z.string().min(2),
  dimensions: z.string().min(2),
  comment: z.string().min(2),
  botCheck: z.literal(true),
  website: z.string().max(0).optional().default("")
});

export async function POST(request: Request) {
  const body = await request.json();
  const ip = getClientIp(request);
  const limit = checkRateLimit({
    key: `contact-form:${ip}`,
    maxRequests: 8,
    windowMs: 10 * 60 * 1000,
    blockMs: 20 * 60 * 1000
  });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSec)
        }
      }
    );
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const record = await createContactRequest({
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email,
    source: parsed.data.source,
    message: [
      `Тип изделия: ${parsed.data.productType}`,
      `Материал: Кварцевый агломерат`,
      `Размеры: ${parsed.data.dimensions}`,
      `Комментарий: ${parsed.data.comment}`
    ].join("\n")
  });

  let mailStatus: { delivered: boolean; reason?: string };
  try {
    mailStatus = await sendContactMail(parsed.data);
  } catch {
    mailStatus = { delivered: false, reason: "mail-send-error" };
  }
  return NextResponse.json({ record, mailStatus }, { status: 201 });
}
