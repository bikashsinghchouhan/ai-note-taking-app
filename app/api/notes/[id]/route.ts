import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Note from "@/server/models/note.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


/* UPDATE NOTE */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();
  await connectDB();

  const note = await Note.findOneAndUpdate(
    { _id: params.id, userId: session.user.id },
    { title, content },
    { new: true }
  );

  return NextResponse.json(note);
}

/* DELETE NOTE */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  await Note.findOneAndDelete({
    _id: params.id,
    userId: session.user.id,
  });

  return NextResponse.json({ message: "Note deleted" });
}
