import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import User from "@/server/models/user.model";
import ProfileView from "@/components/ProfileView";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const user = await User.findById(session.user.id)
    .select("-password")
    .lean();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">
        My Profile
      </h1>

      <ProfileView user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
}
