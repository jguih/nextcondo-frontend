import { Button } from "@/src/components/button/button";
import { FC } from "react";

export const ActionEdit: FC<{ label: string }> = ({ label }) => {
  return <Button variant="light">{label}</Button>;
};
