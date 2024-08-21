"use client";
import { FC } from "react";
import styles from "./styles.module.scss";
import { Typography } from "@/src/shared/components/typography/typography";
import { Button } from "@/src/shared/components/button/button";
import { useRouter } from "next/navigation";

type SuccessProps = {
  successMessage: string;
  goToLoginPageActionMessage: string;
};

export const Success: FC<SuccessProps> = ({
  successMessage,
  goToLoginPageActionMessage,
}) => {
  const router = useRouter();
  return (
    <div className={styles["success-box"]}>
      <Typography tag="p" color="success">
        {successMessage}
      </Typography>
      <Button
        onClick={() => {
          router.push("/login");
        }}
      >
        {goToLoginPageActionMessage}
      </Button>
    </div>
  );
};
