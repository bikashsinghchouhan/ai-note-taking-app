"use client";

import { useRouter } from "next/navigation";
import RunningText from "./RunningText";

export default function HeroSection() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col justify-between px-6 pt-24 pb-6 text-center">
      
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          AI Note-Taking App
        </h1>

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

      {/* Footer */}
      <footer className="mt-10 border-t pt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Developed by{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            Bikash Kumar Singh
          </span>{" "}
          • Contact:{" "}
          <a
            href="mailto:your-email@gmail.com"
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
