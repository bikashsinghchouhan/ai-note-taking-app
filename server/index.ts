import { Hono } from "hono";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import Note from "./models/note.model";
import { authOptions } from "@/lib/auth";
const app = new Hono();

/**
 * Get all notes for a user
 */
app.get("/notes/:userId", async (c) => {
  await connectDB();

  const userId = c.req.param("userId");
  const notes = await Note.find({ userId }).sort({ createdAt: -1 });

  return c.json(notes);
});

/**
 * Create a note
 */
app.post("/notes", async (c) => {
const session = await getServerSession(authOptions);

if (!session?.user?.id) {
  return c.json({ message: "Unauthorized" }, 401);
}

const userId = session.user.id; // ✅ NO TS error


  await connectDB();

  const { title, content } = await c.req.json();

  if (!title || !content) {
    return c.json({ message: "Missing fields" }, 400);
  }

  const note = await Note.create({
    title,
    content,
    userId: session.user.id, // 👈 from session
  });

  return c.json(note, 201);
});

/**
 * Get my notes (SECURE)
 */
app.get("/notes", async (c) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  await connectDB();

  const notes = await Note.find({ userId: session.user.id }).sort({
    createdAt: -1,
  });

  return c.json(notes);
});


/**
 * Update note
 */
app.put("/note/:id", async (c) => {
  await connectDB();

  const id = c.req.param("id");
  const data = await c.req.json();

  const note = await Note.findByIdAndUpdate(id, data, { new: true });

  return c.json(note);
});

/**
 * Delete note
 */
app.delete("/note/:id", async (c) => {
  await connectDB();

  const id = c.req.param("id");
  await Note.findByIdAndDelete(id);

  return c.json({ message: "Note deleted" });
});

export default app;
