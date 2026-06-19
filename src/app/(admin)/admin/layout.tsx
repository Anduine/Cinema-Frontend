import "@/assets/styles/globals.css";
import AdminHeader from "@/components/layout/AdminHeader/AdminHeader";
import AuthProvider from "@/contexts/AuthProvider";
import { NotificationsProvider } from "@/contexts/NotificationsContext";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <NotificationsProvider>
          <AuthProvider>
            <AdminHeader />
            <div className="container">
              <main>{children}</main>
            </div>
          </AuthProvider>
        </NotificationsProvider>
      </body>
    </html>
  );
}
export default RootLayout;
