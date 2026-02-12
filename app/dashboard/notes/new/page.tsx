"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function CreateNotePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const noteId = searchParams.get("id");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const isEditMode = !!noteId;

    // 🔥 Fetch existing note if edit mode
  useEffect(() => {
  if (!noteId) return;

  fetch(`/api/notes`, {
    credentials: "include",
  })
    .then(res => res.json())
    .then(data => {
      const note = data.find((n: any) => n._id === noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    });
}, [noteId]);


  

const handleSubmit = async () => {
  if (!title || !content) {
    toast.error("All fields required");
    return;
  }

  setLoading(true);

  try {
    let res;

    if (isEditMode) {
      // ✅ UPDATE
      res = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    } else {
      // ✅ CREATE
      res = await fetch(`/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    toast.success(
      isEditMode
        ? "Note updated successfully ✏️"
        : "Note created successfully 🎉"
    );

    router.push("/dashboard/notes");
  } catch (error: any) {
    toast.error(error.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
                {isEditMode ? "Update Note" : "Create Note"}
            </h1>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg px-4 py-2"
            />

            <textarea
                placeholder="Write your note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                className="w-full border rounded-lg px-4 py-2"
            />

            <Button onClick={handleSubmit} disabled={loading}>
                {loading
                    ? isEditMode
                        ? "Updating..."
                        : "Creating..."
                    : isEditMode
                        ? "Update Note"
                        : "Create Note"}
            </Button>
        </div>
    );
}
