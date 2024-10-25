import { FC } from "react";
import { Typography } from "../typography/typography";
import { Dictionary } from "@/src/features/localization/types";
import { Link } from "../link/link";
import styles from "./styles.module.scss";

export const ResourceDoesNotExist: FC<{
  d: Dictionary;
  callbackPath: string;
}> = ({ d, callbackPath }) => {
  return (
    <div className={styles.container}>
      <Typography color="danger">{d.common.resource_does_not_exist}</Typography>
      <Link href={callbackPath} variant="solid" color="primary">
        {d.button.go_back}
      </Link>
    </div>
  );
};
