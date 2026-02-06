import { NextResponse } from "next/server";
import { getSiteData } from "@/lib/data";

export async function GET() {
  const data = await getSiteData();
  return NextResponse.json({
    categories: data.categories,
  });
}
