"use client";
import { FC, PropsWithChildren, useEffect } from "react";
import { createClient } from "../supabase/client";
import { useRouter } from "next/navigation";

export const AuthBoundary: FC<PropsWithChildren> = ({ children }) => {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      switch (event) {
        case "SIGNED_OUT": {
          router.push("/login");
        }
      }
    });
    return data.subscription.unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};