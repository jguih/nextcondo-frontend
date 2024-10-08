"use client";
import { Button } from "@/src/components/button/button";
import { useRouter } from "next/navigation";
import { FC, MouseEventHandler } from "react";

export const ActionEdit: FC<{ label: string; occurrenceId: string }> = ({
  label,
  occurrenceId,
}) => {
  const router = useRouter();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    router.push(`/occurrences/${occurrenceId}/edit`);
  };

  return (
    <Button variant="light" onClick={handleOnClick}>
      {label}
    </Button>
  );
};
