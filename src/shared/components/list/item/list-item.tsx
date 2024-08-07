import { ComponentProps, FC } from "react";

export const ListItem: FC<ComponentProps<"li">> = (props) => {
  return <li {...props} />;
};
