"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success(data.message || "Reset link sent successfully 📩");
      setEmail("");
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex min-h-screen items-center justify-center 
    px-4">

      <form
        onSubmit={handleReset}
        className="w-full max-w-md rounded-2xl bg-white/90 
        backdrop-blur-md p-8 shadow-2xl"
      >
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Forgot Password?
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Enter your email and we’ll send a reset link
        </p>

        <div className="relative mb-6">
          <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-gray-300 
            pl-10 pr-3 py-2.5 focus:outline-none 
            focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 
          text-white font-semibold transition 
          hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
