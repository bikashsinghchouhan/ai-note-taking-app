import { NextResponse } from "next/server";
import { runAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { content } = await req.json();
  const improved = await runAI(content, "improve");
  return NextResponse.json({ improved });
}
