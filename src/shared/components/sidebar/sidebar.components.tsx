import { KeyboardArrowDown, Message, Person } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
  Typography,
  List,
  ListItem,
} from "@mui/joy";
import { Toggler } from "../utils/toggler";
import HomeIcon from "@mui/icons-material/Home";

const Occurences = () => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <Message />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Ocorrências</Typography>
          </ListItemContent>
          <KeyboardArrowDown
            sx={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </ListItemButton>
      )}
    >
      <List>
        <ListItem>Avisos</ListItem>
        <ListItem>Emergências</ListItem>
      </List>
    </Toggler>
  );
};

const Users = () => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <Person />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Usuário</Typography>
          </ListItemContent>
          <KeyboardArrowDown />
        </ListItemButton>
      )}
    >
      <List>
        <ListItem>User 1</ListItem>
        <ListItem>User 2</ListItem>
      </List>
    </Toggler>
  );
};

const CommonAreas = () => {
  return (
    <Toggler
      renderToggle={({ open, setOpen }) => (
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemDecorator>
            <HomeIcon />
          </ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">Áreas comuns</Typography>
          </ListItemContent>
          <KeyboardArrowDown />
        </ListItemButton>
      )}
    >
      <List>
        <ListItem>Lavanderia</ListItem>
        <ListItem>Academia</ListItem>
      </List>
    </Toggler>
  );
};

const SidebarComponents = {
  Occurences,
  Users,
  CommonAreas,
};

export default SidebarComponents;
