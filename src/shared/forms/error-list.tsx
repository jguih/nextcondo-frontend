import { List, ListItem, ListItemContent } from "@mui/joy";
import { FC } from "react";

export const ErrorList: FC<{ errors: string[] }> = ({ errors }) => {
  return (
    <List component={"ul"}>
      {errors.map((error, index) => (
        <ListItem key={index} color="danger">
          <ListItemContent>{error}</ListItemContent>
        </ListItem>
      ))}
    </List>
  );
};
