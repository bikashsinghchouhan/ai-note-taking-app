import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileView from "@/components/ProfileView";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        My Profile
      </h1>

      <ProfileView user={session.user} />
    </div>
  );
}
