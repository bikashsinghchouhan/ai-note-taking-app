"use client";

import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";

import toast from "react-hot-toast";

const handleLogout = async () => {
  await signOut({ redirect: false });
  toast.success("Logged out successfully 👋");
  window.location.href = "/";
};

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <Link href="/dashboard/notes" className="text-xl font-bold text-indigo-600">
        AI Notes
      </Link>

      <ProfileMenu />
    </header>
  );
}
