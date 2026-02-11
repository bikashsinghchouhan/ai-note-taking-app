"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, LogOut, UserCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileMenu() {
    const [open, setOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);


    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        toast.success("Logged out successfully 👋");
        router.push("/");
    };
    // ✅ CLOSE ON OUTSIDE CLICK
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);
    return (
        <div ref={menuRef} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white cursor-pointer"
            >
                <UserCircle />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-gray-900 dark:text-white shadow-lg border p-4">
                    <button
                        onClick={() => {
                            setOpen(false);
                            router.push("/profile");
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800  rounded-xl cursor-pointer"
                    >
                        <User size={16} />
                        My Profile
                    </button>

                    <button 
                        onClick={() => setShowConfirm(true)}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100  dark:hover:bg-gray-800 rounded-xl cursor-pointer"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>

                </div>
            )}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40  dark:text-gray-200">
                    <div className="w-120  rounded-xl bg-white  dark:bg-gray-900 p-6 shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Confirm Logout</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to logout?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="rounded-lg px-4 py-2 cursor-pointer bg-gray-300 dark:bg-gray-900 text-sm border hover:bg-gray-300  dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleLogout}
                                className="rounded-lg px-4 py-2 cursor-pointer text-sm bg-red-600 text-white hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
}
