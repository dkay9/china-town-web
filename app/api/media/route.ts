import { NextResponse } from "next/server";
import { readdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  try {
    const uploadDir = join(process.cwd(), "public", "uploads");
    const entries = await readdir(uploadDir);
    const files = entries.filter(
      (f) => !f.startsWith(".") && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)
    );
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
