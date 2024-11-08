import { FC, PropsWithChildren } from "react";
import { List } from "../../list/list";

export const AppSidebarContent: FC<PropsWithChildren> = ({ children }) => {
  return <List spacing="sm">{children}</List>;
};
