"use client";

import { signOut } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

import toast from "react-hot-toast";

const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("Logged out successfully 👋");
    window.location.href = "/";
};

export default function Header() {
    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-white px-3  shadow-sm mb-4 dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
                <Link href="/dashboard/notes" className="text-xl font-bold text-indigo-600">
                    AI Notes App
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <ProfileMenu />
                </div>

            </div>
        </header>
    );
}
