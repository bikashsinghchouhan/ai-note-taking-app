"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm({
  user,
  onCancel,
}: {
  user: any;
  onCancel: () => void;
}) {
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [location, setLocation] = useState(user.location || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, bio, phone, location }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Profile updated successfully ✅");
      window.location.reload(); // refresh to show updated values
    } else {
      toast.error("Failed to update profile ❌");
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md space-y-4">

      <input placeholder="Enter Name" className="input" value={name} onChange={e => setName(e.target.value)} />
      <textarea placeholder="Enter Bio" className="input" rows={3} value={bio} onChange={e => setBio(e.target.value)} />
      <input placeholder="Enter Phone Number" className="input" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="Current Location" className="input" value={location} onChange={e => setLocation(e.target.value)} />

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          onClick={onCancel}
          className="rounded-lg border px-6 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
