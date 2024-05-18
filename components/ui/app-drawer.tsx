import {
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { House } from "../icons/House";

export const AppDrawer = () => {
  return (
    <Drawer open={true}>
      <Stack
        direction={"row"}
        gap={1}
        p={1}
        borderBottom={"1px solid"}
        borderColor={"divider"}
      >
        <Avatar size="lg" />
        <div>
          <Typography>Username</Typography>
          <Typography>aaaa</Typography>
        </div>
      </Stack>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <House />
            </ListItemDecorator>
            Áreas comuns
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
