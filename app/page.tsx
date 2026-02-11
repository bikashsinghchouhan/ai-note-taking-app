import HeroSection from "@/components/HeroSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
export default  async function HomePage() {
  const session = await getServerSession(authOptions);

  // 🔥 If logged in → redirect
  if (session) {
    redirect("/dashboard/notes");
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:bg-gray-900">
      <HeroSection />
    </main>
  );
}
