import { NextResponse } from "next/server";
import { runAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { content } = await req.json();
  const summary = await runAI(content, "summary");
  return NextResponse.json({ summary });
}
