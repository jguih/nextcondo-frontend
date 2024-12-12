import { FC } from "react";
import { IconBase, IconBaseProps } from "../icon-base";

export const HomePlus: FC<IconBaseProps> = (props) => {
  return (
    <IconBase {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12h2l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h5.5"></path>
        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2"></path>
        <path d="M16 19h6"></path> <path d="M19 16v6"></path>
      </svg>
    </IconBase>
  );
};
