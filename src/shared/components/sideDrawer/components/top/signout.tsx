"use client";

import { createClient } from "@/src/shared/authentication/supabase/client";
import { LogoutRounded } from "@mui/icons-material";
import { IconButton } from "@mui/joy";
import { FC, useEffect, useState } from "react";

export const SignOut: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleSignOut = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      setIsLoading(false);
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
