import { ComponentProps, FC } from "react";

export const Error: FC<ComponentProps<"p">> = (props) => {
  return <p {...props} style={{ color: "var(--danger)", ...props.style }} />;
};
