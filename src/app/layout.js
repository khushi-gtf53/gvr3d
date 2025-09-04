  import SmoothScroll from "@/utils/SmoothScroll";
  import "./globals.css";

  export const metadata = {
    title: "GVR Landing Page",
    description: "Next.js + React Three Fiber Landing Page",
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className="bg-black text-white">
          <SmoothScroll/>
          {children}
        </body>
      </html>
    );
  }
