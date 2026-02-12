import { NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/server/models/user.model";
import {connectDB} from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "No account found with this email" },
        { status: 404 }
      );
    }

    // 🔥 Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
    await user.save();

    // 👉 For now just log link (email setup later)
    console.log(
      `Reset Link: http://localhost:3000/reset-password?token=${token}`
    );

    return NextResponse.json(
      { message: "Reset link generated successfully (check console)" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
