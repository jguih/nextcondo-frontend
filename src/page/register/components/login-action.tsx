"use client";
import { Link, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface LoginActionProps {
  linkText: string;
  text: string;
}

export const LoginAction: FC<LoginActionProps> = ({ linkText, text }) => {
  const router = useRouter();
  return (
    <Typography level="body-sm">
      {text} <Link onClick={() => router.push("/login")}>{linkText}</Link>
    </Typography>
  );
};
