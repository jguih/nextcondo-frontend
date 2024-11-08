import { FC } from "react";
import { IconBase, IconBaseProps } from "../icon-base";

export const ChevronDown: FC<IconBaseProps> = (props) => {
  return (
    <IconBase {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6l6 -6"></path>
      </svg>
    </IconBase>
  );
};
