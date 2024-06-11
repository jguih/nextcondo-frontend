import { Person, KeyboardArrowDown } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Typography,
  List,
} from "@mui/joy";
import { FC } from "react";
import { Toggler } from "../../../utils/toggler";

interface UserProps {
  label: string;
}

export const User: FC<UserProps> = ({ label }) => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <Person />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">{label}</Typography>
          </ListItemContent>
          <KeyboardArrowDown />
        </ListItemButton>
      )}
    >
      <List>
        <ListItemButton>Meu Perfil</ListItemButton>
      </List>
    </Toggler>
  );
};
