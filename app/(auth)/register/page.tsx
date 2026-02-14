"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      toast.success(data.message || "Account created successfully 🎉");
      router.push("/login");
    } else {
      toast.error(data.message || "Registration failed");
    }
  };

  return (
    <div className="w-full flex min-h-screen items-center justify-center 
     px-4">

      <form
        onSubmit={handleRegister}
        className="w-full max-w-md rounded-2xl bg-white/90 
        backdrop-blur-md p-8 shadow-2xl dark:text-gray-800"
      >
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Create Account 
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Join us and start your journey
        </p>

        {/* Name */}
        <div className="relative mb-4">
          <User size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border border-gray-300 
            pl-10 pr-3 py-2.5 focus:outline-none 
            focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="relative mb-4">
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

        {/* Password */}
        <div className="relative mb-6">
          <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 
            pl-10 pr-10 py-2.5 focus:outline-none 
            focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 
          text-white font-semibold transition 
          hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
