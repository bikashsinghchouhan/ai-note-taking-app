"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";

export default function ProfileView({ user }: any) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(user);

  const handleProfileUpdate = (updatedUser: any) => {
    setProfile(updatedUser);   // 🔥 update UI instantly
    setEditing(false);         // close edit mode
  };

  if (editing) {
    return (
      <ProfileForm
        user={profile}
        onCancel={() => setEditing(false)}
        onSuccess={handleProfileUpdate}   // 🔥 new prop
      />
    );
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm border space-y-8 dark:bg-gray-900">

      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white text-xl font-semibold">
          {profile.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-500">
            {profile.email}
          </p>
        </div>
      </div>

      <div className="border-t" />

      <div className="grid gap-6 sm:grid-cols-2">

        <div>
          <p className="text-sm font-medium text-gray-500">Full Name</p>
          <p className="mt-1 text-gray-900 dark:text-gray-500">{profile.name || "—"}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Email Address</p>
          <p className="mt-1 text-gray-900 dark:text-gray-500">{profile.email || "—"}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Phone Number</p>
          <p className="mt-1 text-gray-900 dark:text-gray-500">{profile.phone || "—"}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Location</p>
          <p className="mt-1 text-gray-900 dark:text-gray-500">{profile.location || "—"}</p>
        </div>

        <div className="sm:col-span-2 dark:text-gray-500">
          <p className="text-sm font-medium text-gray-500 ">Bio</p>
          <p className="mt-1 text-gray-900 dark:text-gray-500 whitespace-pre-line">
            {profile.bio || "No bio added yet."}
          </p>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={() => setEditing(true)}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700 transition cursor-pointer"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
