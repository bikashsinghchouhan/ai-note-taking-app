"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NoteCard from "@/components/NoteCard";

type Note = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
};

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     fetch("/api/notes", {
    //         credentials: "include",
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setNotes(data);
    //             setLoading(false);
    //         })
    //         .catch(() => setLoading(false));
    // }, []);
    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await fetch("/api/notes", {
                    credentials: "include",
                });

                const data = await res.json();

                console.log("STATUS:", res.status);
                console.log("DATA:", data);

                if (!res.ok) {
                    console.error("Server Error:", data);
                    setLoading(false);
                    return;
                }

                setNotes(data);
                setLoading(false);
            } catch (error) {
                console.error("Fetch Error:", error);
                setLoading(false);
            }
        }

        fetchNotes();
    }, []);


    if (loading) return <p>Loading notes...</p>;

    return (
        <div className="space-y-6 pt-16">
           
            {/* Search Input */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold whitespace-nowrap">My Notes</h1>

                <div className="flex  items-center flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg px-2 md:px-4 py-2 w-56 "
                    />
                   <div>
                    <Link href="/dashboard/notes/new">
                        <Button>Create Note</Button>
                    </Link>
                    </div>
                </div>
            </div>


            {notes.length === 0 ? (
                <p className="text-gray-500">No notes yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes
                        .filter(note =>
                            note.title.toLowerCase().includes(search.toLowerCase())
                        ).map(note => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onDelete={(id: string) =>
                                    setNotes(prev => prev.filter(n => n._id !== id))
                                }
                            />
                        ))}
                </div>
            )}
        </div>
    );
}
