"use client";

import { Button } from "@/src/components/button/button";
import { ButtonGroup } from "@/src/components/button/buttonGroup/button-group";
import { FC, ReactElement, useState } from "react";
import styles from "./styles.module.scss";

export const Toggler: FC<{
  componentCreate: ReactElement | ReactElement[];
  componentEnter: ReactElement | ReactElement[];
  label: {
    create: string;
    enter: string;
  };
}> = ({ componentCreate, componentEnter, label }) => {
  const [tab, setTab] = useState<number>(0);

  return (
    <div>
      <ButtonGroup className={styles["button-group"]}>
        <Button
          onClick={() => setTab(0)}
          variant={tab === 0 ? "solid" : "light"}
          fullWidth
        >
          {label.create}
        </Button>
        <Button
          onClick={() => setTab(1)}
          variant={tab === 1 ? "solid" : "light"}
          fullWidth
        >
          {label.enter}
        </Button>
      </ButtonGroup>
      {tab == 0 ? componentCreate : componentEnter}
    </div>
  );
};
