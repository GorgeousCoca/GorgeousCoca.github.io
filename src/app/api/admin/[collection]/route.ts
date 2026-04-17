import { NextResponse } from "next/server";

import { adminCollections, type AdminCollectionKey } from "@/lib/admin/config";
import { isAdminAuthorized } from "@/lib/admin/auth";
import { createItem, listCollection } from "@/lib/cms/store";

type RouteContext = {
  params: Promise<{ collection: string }>;
};

function isCollectionKey(value: string): value is AdminCollectionKey {
  return value in adminCollections;
}

export async function GET(_: Request, context: RouteContext) {
  if (!(await isAdminAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await context.params;

  if (!isCollectionKey(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const items = await listCollection(collection);
  return NextResponse.json(items);
}

export async function POST(request: Request, context: RouteContext) {
  if (!(await isAdminAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collection } = await context.params;

  if (!isCollectionKey(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const body = await request.json();
  const item = await createItem(collection, body);
  return NextResponse.json(item, { status: 201 });
}
