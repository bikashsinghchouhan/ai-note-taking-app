"use client";

import { useRouter } from "next/navigation";
import RunningText from "./RunningText";

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        AI Note-Taking App
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-gray-600">
        Write smarter notes, summarize instantly, improve content, and generate tags using AI.
      </p>

      <RunningText />

      <button
        onClick={() => router.push("/login")}
        className="mt-10 rounded-xl bg-indigo-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-700"
      >
        Login to Continue →
      </button>
    </div>
  );
}
