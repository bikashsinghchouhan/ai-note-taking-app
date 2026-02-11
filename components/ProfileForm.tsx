"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm({
  user,
  onCancel,
  onSuccess,
}: {
  user: any;
  onCancel: () => void;
  onSuccess: (updatedUser: any) => void;
}) {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [location, setLocation] = useState(user.location || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bio, phone, location }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      toast.success("Profile updated successfully ✅");

      onSuccess(data);   // 🔥 update parent instantly

    } catch (error: any) {
      toast.error(error.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl bg-white dark:bg-gray-700 p-6 shadow-md space-y-4 border">

      <input
        className="w-full rounded-lg border px-4 py-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />

      <textarea
        className="w-full rounded-lg border px-4 py-2"
        rows={3}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
      />

      <input
        className="w-full rounded-lg border px-4 py-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />

      <input
        className="w-full rounded-lg border px-4 py-2"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />

      <div className="flex gap-3 pt-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white cursor-pointer hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          onClick={onCancel}
          className="rounded-lg border px-6 py-2 hover:bg-gray-50 dark:hover:bg-gray-500  cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
