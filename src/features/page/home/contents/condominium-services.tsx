import { Calendar } from "@/src/components/icon/icons/calendar";
import styles from "./styles.module.scss";
import { Link } from "@/src/components/link/link";
import { Typography } from "@/src/components/typography/typography";
import { FC, ReactNode } from "react";
import { Alert } from "@/src/components/icon/icons/alert";
import { Users } from "@/src/components/icon/icons/users";
import { Gear } from "@/src/components/icon/icons/gear";

type CondominiumServicesProps = {
  title: string;
  children: ReactNode | ReactNode[];
};

export const CondominiumServices: FC<CondominiumServicesProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles["services-grid"]}>
      <Typography className={styles.title} tag="h4">
        {title}
      </Typography>
      {children}
    </div>
  );
};

export const CondominiumServicesReservations: FC<{ label: string }> = ({
  label,
}) => {
  return (
    <Link href={"/"} variant="solid" color="primary" orientation="vertical">
      <Typography tag="span">{label}</Typography>
      <Calendar size="xl" bold />
    </Link>
  );
};

export const CondominiumServicesOccurrences: FC<{ label: string }> = ({
  label,
}) => {
  return (
    <Link
      href={"/occurrences"}
      variant="solid"
      color="primary"
      orientation="vertical"
    >
      <Typography tag="span">{label}</Typography>
      <Alert size="xl" bold />
    </Link>
  );
};

export const CondominiumServicesTenants: FC<{ label: string }> = ({
  label,
}) => {
  return (
    <Link href={"/"} variant="solid" color="primary" orientation="vertical">
      <Typography tag="span">{label}</Typography>
      <Users size="xl" bold />
    </Link>
  );
};

export const CondominiumServicesPlaceholder: FC<{ label: string }> = ({
  label,
}) => {
  return (
    <Link href={"/"} variant="solid" color="primary" orientation="vertical">
      <Typography tag="span">{label}</Typography>
      <Gear size="xl" bold />
    </Link>
  );
};
