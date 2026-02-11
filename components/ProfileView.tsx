"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";

export default function ProfileView({ user }: any) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return <ProfileForm user={user} onCancel={() => setEditing(false)} />;
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border     space-y-4">

      {/* Name */}
      <div>
        <p className="text-sm text-gray-500">Name</p>
        <p className="font-medium">{user.name}</p>
      </div>

      {/* Email */}
      <div>
        <p className="text-sm text-gray-500">Email</p>
        <p className="font-medium">{user.email}</p>
      </div>

      {/* Bio */}
      <div>
        <p className="text-sm text-gray-500">Bio</p>
        <p className="font-medium">
          {user.bio || "—"}
        </p>
      </div>

      {/* Phone */}
      <div>
        <p className="text-sm text-gray-500">Phone</p>
        <p className="font-medium">
          {user.phone || "—"}
        </p>
      </div>

      {/* Location */}
      <div>
        <p className="text-sm text-gray-500">Location</p>
        <p className="font-medium">
          {user.location || "—"}
        </p>
      </div>

      <button
        onClick={() => setEditing(true)}
        className="mt-4 rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
      >
        Edit Profile
      </button>
    </div>
  );
}
