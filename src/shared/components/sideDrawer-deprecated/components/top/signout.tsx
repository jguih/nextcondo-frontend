"use client";

import { useSupabaseClient } from "@/src/shared/authentication/supabase/client";
import { LogoutRounded } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import { FC, useEffect, useState } from "react";

export const SignOut: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();

  const handleSignOut = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut().then(() => setIsLoading(false));
    };
    if (isLoading) {
      signOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <IconButton
      sx={{ marginLeft: "auto" }}
      size="sm"
      onClick={handleSignOut}
      loading={isLoading}
    >
      <LogoutRounded />
    </IconButton>
  );
};
