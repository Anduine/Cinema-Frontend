import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/contexts/AuthProvider";
import Header from "@/components/layout/Header/Header";
import "@/assets/styles/globals.css";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online cinema",
  description: "Online cinema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={``}>
      <body>
        <NotificationsProvider>
          <AuthProvider>
            <Header />
            <div className="container">
              <main>{children}</main>
            </div>
          </AuthProvider>
        </NotificationsProvider>
      </body>
    </html>
  );
}
