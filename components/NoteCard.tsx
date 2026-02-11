"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function NoteCard({ note }: any) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
     await fetch(`/api/notes/${note._id}`, {
  method: "DELETE",
  credentials: "include", // ✅ IMPORTANT
});

    toast.success("Note deleted");
    setShowConfirm(false);
    router.refresh();
  };

  return (
    <>
      {/* CARD */}
      <Card className="relative hover:shadow-md transition">
        <Link href={`/dashboard/notes/${note._id}`}>
          <CardContent className="p-4 space-y-2 cursor-pointer">
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {note.content}
            </p>
          </CardContent>
        </Link>

        {/* ACTION BUTTONS */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/dashboard/notes/${note._id}?edit=true`);
            }}
            className="rounded-md bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            className="rounded-md bg-red-100 p-2 text-red-600 hover:bg-red-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </Card>

      {/* DELETE CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">
              Delete Note
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this note?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
