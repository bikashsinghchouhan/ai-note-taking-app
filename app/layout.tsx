import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "AI Notes",
  description: "AI Powered Notes App",
icons: {
  icon: "/pencil.png",
  
},

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className="bg-gray-50 text-gray-900 dark:text-white dark:bg-gray-900">
        
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
