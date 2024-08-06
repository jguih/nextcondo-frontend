import { KeyboardArrowDown, Message } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Typography,
  List,
} from "@mui/joy";
import { Toggler } from "../../../utils/toggler";
import { FC } from "react";

interface OccurrencesProps {
  label: string;
}

export const Occurrences: FC<OccurrencesProps> = ({ label }) => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <Message />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">{label}</Typography>
          </ListItemContent>
          <KeyboardArrowDown
            sx={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </ListItemButton>
      )}
    >
      <List>
        <ListItemButton>Todas as Ocorrências</ListItemButton>
        <ListItemButton>Avisos</ListItemButton>
        <ListItemButton>Emergências</ListItemButton>
        <ListItemButton>Criar Ocorrência</ListItemButton>
      </List>
    </Toggler>
  );
};
