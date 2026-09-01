import type { Metadata } from "next";

import "./globals.css";

import Sidebar from "./components/Sidebar";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Toko",
  description: "Task Management Dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <div className="min-h-screen">
          <Sidebar />

          <main className="lg:ml-56">
            <div className="animate-page-enter">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
