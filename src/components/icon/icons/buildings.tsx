import { FC } from "react";
import { IconBase, IconBaseProps } from "../icon-base";

export const Buildings: FC<IconBaseProps> = (props) => {
  return (
    <IconBase {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 21v-15c0 -1 1 -2 2 -2h5c1 0 2 1 2 2v15"></path>
        <path d="M16 8h2c1 0 2 1 2 2v11"></path> <path d="M3 21h18"></path>
        <path d="M10 12v0"></path> <path d="M10 16v0"></path>
        <path d="M10 8v0"></path> <path d="M7 12v0"></path>
        <path d="M7 16v0"></path> <path d="M7 8v0"></path>
        <path d="M17 12v0"></path> <path d="M17 16v0"></path>
      </svg>
    </IconBase>
  );
};
