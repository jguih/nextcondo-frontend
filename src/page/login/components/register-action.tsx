"use client";
import { Link, Typography } from "@mui/joy";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface RegisterActionProps {
  linkText: string;
  text: string;
}

export const RegisterAction: FC<RegisterActionProps> = ({ linkText, text }) => {
  const router = useRouter();
  return (
    <Typography level="body-sm">
      {text} <Link onClick={() => router.push("/register")}>{linkText}</Link>
    </Typography>
  );
};
