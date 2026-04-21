import { NextResponse } from "next/server";
import { z } from "zod";

import { createContactRequest } from "@/lib/cms/store";
import { sendContactMail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.email(),
  source: z.string().min(2),
  productType: z.string().min(2),
  dimensions: z.string().min(2),
  comment: z.string().min(2)
});

export async function POST(request: Request) {
  const body = await request.json();
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
