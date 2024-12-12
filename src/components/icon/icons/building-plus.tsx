import { FC } from "react";
import { IconBase, IconBaseProps } from "../icon-base";

export const BuildingPlus: FC<IconBaseProps> = (props) => {
  return (
    <IconBase {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21h9"></path> <path d="M9 8h1"></path>
        <path d="M9 12h1"></path> <path d="M9 16h1"></path>
        <path d="M14 8h1"></path> <path d="M14 12h1"></path>
        <path d="M5 21v-16c0 -.53 .211 -1.039 .586 -1.414c.375 -.375 .884 -.586 1.414 -.586h10c.53 0 1.039 .211 1.414 .586c.375 .375 .586 .884 .586 1.414v7"></path>
        <path d="M16 19h6"></path> <path d="M19 16v6"></path>
      </svg>
    </IconBase>
  );
};
