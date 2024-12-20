"use client";
import { FloatButton } from "@/src/components/button/float/float-button";
import { Plus } from "@/src/components/icon/icons/plus";
import { useRouter } from "next/navigation";
import { FC, MouseEventHandler } from "react";

export const AddCommonAreaButton: FC = () => {
  const router = useRouter();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    router.push("/condominium/admin/commonAreas/add");
  };

  return (
    <FloatButton onClick={handleOnClick}>
      <Plus />
    </FloatButton>
  );
};
