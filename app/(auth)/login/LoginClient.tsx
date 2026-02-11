"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const res = await signIn("credentials", {
  //     email,
  //     password,
  //     redirect: false,
  //   });

  //   setLoading(false);

  //   if (!res?.error) {
  //     router.push("/dashboard/notes");
  //   } else {
  //     alert("Invalid credentials");
  //   }
  // };
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-2xl font-bold">
          Welcome Back
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="input mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password with eye icon */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          New user?{" "}
          <Link href="/register" className="text-indigo-600 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
