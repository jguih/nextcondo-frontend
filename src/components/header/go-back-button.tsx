"use client";
import { FC, MouseEventHandler } from "react";
import { Button, ButtonProps } from "../button/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "../icon/icons/arrow-left";

export const GoBackButton: FC<{ path?: string } & ButtonProps> = ({
  path,
  ...props
}) => {
  const router = useRouter();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    props.onClick?.(e);
    if (!path) {
      router.back();
    } else {
      router.push(path);
    }
  };

  return (
    <Button variant="light" color="neutral" {...props} onClick={handleOnClick}>
      <ArrowLeft />
      {props.children}
    </Button>
  );
};
