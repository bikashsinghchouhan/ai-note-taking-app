import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "AI Notes",
  description: "AI Powered Notes App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
