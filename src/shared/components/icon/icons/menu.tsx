import { FC } from "react";
import { IconBase, IconBaseProps } from "../icon-base";

export const Menu: FC<IconBaseProps> = (props) => {
  return (
    <IconBase {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-menu-2"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l16 0" />
        <path d="M4 12l16 0" />
        <path d="M4 18l16 0" />
      </svg>
    </IconBase>
  );
};
