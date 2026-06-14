import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured");
  const category = searchParams.get("category");
  const cursor = searchParams.get("cursor");
  const take = parseInt(searchParams.get("take") || "20");

  const where: Record<string, unknown> = {};
  if (featured === "true") where.featured = true;
  if (category) where.category = category;

  const products = await prisma.product.findMany({
    where,
    orderBy: { order: "asc" },
    take,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
  });

  const nextCursor = products.length === take ? products[products.length - 1].id : null;

  return NextResponse.json({ products, nextCursor });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const product = await prisma.product.create({ data: body });
  return NextResponse.json(product, { status: 201 });
}
