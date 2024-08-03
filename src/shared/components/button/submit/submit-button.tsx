"use client";
import { FC, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../button";

export const SubmitButton: FC<ButtonProps> = (props) => {
  const [mounted, setMounted] = useState(false);
  const { pending } = useFormStatus();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button type="submit" disabled={!mounted} loading={pending} {...props} />
  );
};
