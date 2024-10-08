"use client";

import { Button } from "@/src/components/button/button";
import { Plus } from "@/src/components/icon/icons/plus";
import { useRouter } from "next/navigation";
import { FC, MouseEventHandler } from "react";
import styles from "./styles.module.scss";

export const AddOccurrenceButton: FC = () => {
  const router = useRouter();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    router.push("/occurrences/add");
  };

  return (
    <Button
      round
      onClick={handleOnClick}
      aria-label="add new occurrence"
      className={styles.float}
    >
      <Plus size="lg" />
    </Button>
  );
};
