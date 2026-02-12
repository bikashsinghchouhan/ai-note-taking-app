"use client";

import { useRouter } from "next/navigation";
import RunningText from "./RunningText";

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col justify-between bg-slate-100  dark:bg-gray-900">

      {/* 🔹 Top Title Section (Header Position) */}
      <div className="w-full  border-b py-5">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
          AI Note-Taking App
        </h1>
      </div>

      {/* 🔹 Center Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
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

      {/* 🔹 Footer */}
      <footer className="border-t py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Developed by{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Bikash Kumar Singh
          </span>{" "}
          • Contact:{" "}
          <a
            href="mailto:bikashkrsin2@gmail.com"
            className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            bikashkrsin2@gmail.com
          </a>
        </p>

        <p className="mt-2">
          © {new Date().getFullYear()} AI Note-Taking App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
