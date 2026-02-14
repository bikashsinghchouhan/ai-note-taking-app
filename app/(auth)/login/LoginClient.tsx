"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res?.error) {
      toast.success("Login successful 🎉");
      router.push("/dashboard/notes");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center dark:text-gray-800  px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white/90 
        backdrop-blur-md p-8 shadow-2xl"
      >
        {/* Heading */}
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-800">
          Login 
        </h2>
        <p className="mb-6 text-center text-sm text-gray-500">
          Login to continue to your dashboard
        </p>

        {/* Email */}
        <div className="relative mb-4">
          <Mail
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
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
        <div className="relative mb-2">
          <Lock
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />
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

        {/* Forgot Password */}
        <div className="text-right mb-5">
          <Link
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 
          text-white font-semibold transition 
          hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="mt-6 text-center text-sm text-gray-600">
          New user?{" "}
          <Link
            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}
