import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/server/models/user.model";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { name, bio, phone, location } = await req.json();

  await connectDB();

  await User.findByIdAndUpdate(session.user.id, {
    name,
    bio,
    phone,
    location,
  });

  return NextResponse.json({ success: true });
}
