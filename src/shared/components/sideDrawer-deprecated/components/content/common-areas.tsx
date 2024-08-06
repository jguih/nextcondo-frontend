import { Home, KeyboardArrowDown } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Typography,
  List,
} from "@mui/joy";
import { FC } from "react";
import { Toggler } from "../../../utils/toggler";

interface CommonAreasProps {
  label: string;
}

export const CommonAreas: FC<CommonAreasProps> = ({ label }) => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <Home />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">{label}</Typography>
          </ListItemContent>
          <KeyboardArrowDown />
        </ListItemButton>
      )}
    >
      <List>
        <ListItemButton>Lavanderia</ListItemButton>
        <ListItemButton>Academia</ListItemButton>
        <ListItemButton>Salão de Festas</ListItemButton>
      </List>
    </Toggler>
  );
};
