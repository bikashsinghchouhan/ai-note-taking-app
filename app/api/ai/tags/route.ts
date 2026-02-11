import { NextResponse } from "next/server";
import { runAI } from "@/lib/ai";

export async function POST(req: Request) {
  const { content } = await req.json();
  const tags = await runAI(content, "tags");
  return NextResponse.json({ tags });
}
