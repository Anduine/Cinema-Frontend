"use client";

import { useEffect } from "react";
import { getMe } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const res = await getMe();

      setUser(res?.data);
    };

    initAuth();
  }, [setUser]);

  return <>{children}</>;
}
export default AuthProvider;
