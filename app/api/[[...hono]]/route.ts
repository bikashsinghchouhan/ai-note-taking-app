import { Hono } from "hono";
import { handle } from "hono/vercel";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Note from "@/server/models/note.model";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
const app = new Hono();

/* ===============================
   TEST ROUTE
================================ */
app.get("/api/test", (c) => {
    return c.json({ message: "Hono is working 🚀" });
});



/* ===============================
   CREATE NOTE
================================ */
app.post("/api/notes", async (c) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    await connectDB();

    const { title, content } = await c.req.json();

    const note = await Note.create({
      title,
      content,
      userId: session.user.id, //  sending the userId
    });

    return c.json(note, 201);
  } catch (error) {
    return c.json({ message: "Failed to create note" }, 500);
  }
});


/* ===============================
   GET ALL NOTES
================================ */
app.get("/api/notes", async (c) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        await connectDB();

        const notes = await Note.find({
            userId: session.user.id, // 🔐 VERY IMPORTANT
        }).sort({ createdAt: -1 });

        return c.json(notes);
    } catch (error) {
        console.error("GET NOTES ERROR:", error);
        return c.json({ message: "Failed to fetch notes" }, 500);
    }
});

/* ===============================
   UPDATE NOTE
================================ */

app.put("/api/notes/:id", async (c) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    await connectDB();

    const id = c.req.param("id");
    const { title, content } = await c.req.json();

    const updated = await Note.findOneAndUpdate(
      {
        _id: id,
        userId: session.user.id, // 🔐 Only owner can update
      },
      { title, content },
      { new: true }
    );

    if (!updated) {
      return c.json({ message: "Note not found" }, 404);
    }

    return c.json(updated);
  } catch (error) {
    return c.json({ message: "Update failed" }, 500);
  }
});


/* ===============================
   DELETE NOTE
================================ */
app.delete("/api/notes/:id", async (c) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    await connectDB();

    const id = c.req.param("id");

    const deleted = await Note.findOneAndDelete({
      _id: id,
      userId: session.user.id, // 🔐 Only owner can delete
    });

    if (!deleted) {
      return c.json({ message: "Note not found" }, 404);
    }

    return c.json({ message: "Deleted successfully" });
  } catch (error) {
    return c.json({ message: "Delete failed" }, 500);
  }
});


export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
