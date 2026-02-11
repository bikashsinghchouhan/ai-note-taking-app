"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AIButton from "@/components/AIButton";
import { useSearchParams, useRouter } from "next/navigation";

export default function NoteDetailPage() {
  const { id } = useParams();

  const [note, setNote] = useState<any>(null);
  const [summary, setSummary] = useState("");
  const [improved, setImproved] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  /* ================= FETCH NOTE ================= */
  useEffect(() => {
    fetch(`/api/notes`)
      .then((res) => res.json())
      .then((notes) => {
        const found = notes.find((n: any) => n._id === id);

        if (found) {
          setTitle(found.title);
          setContent(found.content);
          setNote(found);
        }
      });
  }, [id]);

  /* ================= AI CALL ================= */
  async function callAI(type: "summary" | "improve" | "tags") {
    if (!note) return;

    setLoading(true);

    const res = await fetch(`/api/ai/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: note.content }),
    });

    const data = await res.json();
    setLoading(false);

    if (type === "summary") {
      setSummary(data.summary);
    }

    if (type === "improve") {
      setImproved(data.improved);
    }

    if (type === "tags") {
      if (Array.isArray(data.tags)) {
        setTags(data.tags);
      } else if (typeof data.tags === "string") {
        setTags(
          data.tags
            .split(",")
            .map((t: string) => t.trim())
            .filter(Boolean)
        );
      } else {
        setTags([]);
      }
    }
  }

  if (!note) return <p>Loading...</p>;

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-8">

        {/* TITLE */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            {note.title}
          </h1>
        </div>

        {/* NOTE CONTENT */}
        <div className="bg-white rounded-xl border p-4 shadow-sm dark:bg-gray-900">
          <p className="whitespace-pre-line text-gray-700 dark:text-gray-100 leading-relaxed">
            {note.content}
          </p>
        </div>

        {/* AI ACTION BUTTONS */}
        <div className="flex justify-center gap-4">
          <AIButton label="Summarize" onClick={() => callAI("summary")} />
          <AIButton label="Improve" onClick={() => callAI("improve")} />
          <AIButton label="Tags" onClick={() => callAI("tags")} />
        </div>

        {loading && (
          <p className="text-center text-sm text-gray-500">
            ✨ AI is thinking…
          </p>
        )}

        {/* AI OUTPUTS */}
        <div className="space-y-6">

          {summary && (
            <div className="rounded-xl border bg-blue-50 p-6 dark:bg-gray-900">
              <h3 className="mb-2 text-lg font-semibold text-blue-600">
                AI Summary
              </h3>
              <p className="text-blue-700 leading-relaxed">
                {summary}
              </p>
            </div>
          )}

          {improved && (
            <div className="rounded-xl border bg-green-50 p-6  dark:bg-gray-900">
              <h3 className="mb-2 text-lg font-semibold text-green-600">
                Improved Version
              </h3>
              <p className="text-green-700 leading-relaxed">
                {improved}
              </p>
            </div>
          )}

          {tags.length > 0 && (
            <div className="rounded-xl border bg-purple-50 p-6 dark:bg-gray-900">
              <h3 className="mb-3 text-lg font-semibold text-purple-600">
                Suggested Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-purple-200 px-3 py-1 text-sm font-medium text-purple-900"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* EDIT MODE SAVE BUTTON */}
          {isEdit && (
            <button
              onClick={async () => {
                await fetch(`/api/notes/${id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({ title, content }),
                });

                router.push(`/dashboard/notes/${id}`);
              }}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white"
            >
              Save Changes
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
