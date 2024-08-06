import { People, KeyboardArrowDown } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Typography,
  List,
} from "@mui/joy";
import { FC } from "react";
import { Toggler } from "../../../utils/toggler";

interface ResidentsProps {
  label: string;
}

export const Residents: FC<ResidentsProps> = ({ label }) => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <People />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">{label}</Typography>
          </ListItemContent>
          <KeyboardArrowDown />
        </ListItemButton>
      )}
    >
      <List>
        <ListItemButton>Todos os Moradores</ListItemButton>
      </List>
    </Toggler>
  );
};
