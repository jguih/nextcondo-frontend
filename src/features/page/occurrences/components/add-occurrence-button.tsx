"use client";

import styles from "./styles.module.scss";
import { Button } from "@/src/components/button/button";
import { Plus } from "@/src/components/icon/icons/plus";
import { useRouter } from "next/navigation";
import { FC, MouseEventHandler } from "react";

export const AddOccurrenceButton: FC = () => {
  const router = useRouter();

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = () => {
    router.push("/occurrences/add");
  };

  return (
    <div className={styles["float-container"]}>
      <Button round onClick={handleOnClick}>
        <Plus size="lg" />
      </Button>
    </div>
  );
};
