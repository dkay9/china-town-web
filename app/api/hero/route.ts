import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json({ slides });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slides } = await req.json();

  for (const slide of slides) {
    await prisma.heroSlide.update({
      where: { id: slide.id },
      data: {
        headline: slide.headline,
        subheadline: slide.subheadline,
        ctaLabel: slide.ctaLabel,
        ctaHref: slide.ctaHref,
        imageUrl: slide.imageUrl,
        videoUrl: slide.videoUrl,
        order: slide.order,
        active: slide.active,
      },
    });
  }

  return NextResponse.json({ success: true });
}
