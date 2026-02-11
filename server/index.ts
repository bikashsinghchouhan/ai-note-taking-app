import { Hono } from "hono";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Note from "@/server/models/note.model";

const app = new Hono();

/* =============================
   GET MY NOTES
============================= */
app.get("/notes", async (c) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  await connectDB();

  const notes = await Note.find({
    userId: session.user.id,
  }).sort({ createdAt: -1 });

  return c.json(notes);
});

/* =============================
   CREATE NOTE
============================= */
app.post("/notes", async (c) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const { title, content } = await c.req.json();

  if (!title || !content) {
    return c.json({ message: "Missing fields" }, 400);
  }

  await connectDB();

  const note = await Note.create({
    title,
    content,
    userId: session.user.id,
  });

  return c.json(note, 201);
});

/* =============================
   UPDATE NOTE
============================= */
app.put("/notes/:id", async (c) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const id = c.req.param("id");
  const { title, content } = await c.req.json();

  await connectDB();

  const updated = await Note.findOneAndUpdate(
    {
      _id: id,
      userId: session.user.id,
    },
    { title, content },
    { new: true }
  );

  if (!updated) {
    return c.json({ message: "Note not found" }, 404);
  }

  return c.json(updated);
});

/* =============================
   DELETE NOTE
============================= */
app.delete("/notes/:id", async (c) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const id = c.req.param("id");

  await connectDB();

  const deleted = await Note.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });

  if (!deleted) {
    return c.json({ message: "Note not found" }, 404);
  }

  return c.json({ message: "Deleted successfully" });
});

export default app;
