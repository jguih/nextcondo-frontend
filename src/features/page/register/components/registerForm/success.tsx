"use client";
import { FC } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/button/button";
import { Typography } from "@/src/components/typography/typography";

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
