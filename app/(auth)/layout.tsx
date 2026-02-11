// // import "./globals.css";
// import { Toaster } from "react-hot-toast";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
    
//       <div>
//         {children}
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 3000,
//             style: {
//               borderRadius: "10px",
//               background: "#333",
//               color: "#fff",
//             },
//           }}
//         />
//       </div>
    
//   );
// }


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {children}
    </div>
  );
}
