"use client";
import { FC } from "react";
import { Button, ButtonProps } from "../button";
import { useFormContext } from "../../form/context";

export const SubmitButton: FC<ButtonProps> = (props) => {
  const { isPending } = useFormContext();
  return <Button type="submit" loading={isPending} {...props} />;
};
