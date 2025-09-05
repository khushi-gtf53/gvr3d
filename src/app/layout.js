import SmoothScroll from "@/utils/SmoothScroll";
import "./globals.css";

export const metadata = {
  title: "GVR Landing Page",
  description: "Next.js + React Three Fiber Landing Page",
  icons : {
    icon: "/favicon.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />       
      </head>
      <body className="bg-black text-white">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
