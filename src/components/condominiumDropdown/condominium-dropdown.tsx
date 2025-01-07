import { FC } from "react";
import { List } from "../list/list";
import {
  ListItem,
  ListItemAnchor,
  ListItemButton,
  ListItemDropdown,
} from "../list/items";
import { ChevronDown } from "../icon/icons/chevron-down";
import { Typography } from "../typography/typography";
import { CondominiumService } from "@/src/services/nextcondo/condominium/server";
import { UsersService } from "@/src/services/nextcondo/users/server";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/src/features/localization/get-dictionary";

export const CondominiumDropdown: FC<{ lang: Locale }> = async ({ lang }) => {
  const d = await getDictionary(lang);
  const result = await CondominiumService.GetMineCurrentAsync();
  const currentCondo = result.success ? result.response.data : undefined;
  const isManagerOrOwner =
    await UsersService.IsOwnerOrManagerOfCurrentCondominium();

  if (!currentCondo) return;

  return (
    <List>
      <ListItem>
        <ListItemButton>
          {currentCondo.name} <ChevronDown size="sm" bold />
        </ListItemButton>
        <ListItemDropdown>
          <ListItem>
            <ListItemAnchor href={"/condominium/mine"}>
              <Typography noWrap>
                {d.page.home.dropdown_option_my_condominiums}
              </Typography>
            </ListItemAnchor>
          </ListItem>
          {isManagerOrOwner && (
            <ListItem>
              <ListItemAnchor href={"/condominium/admin"}>
                <Typography noWrap>
                  {d.page.home.dropdown_option_manage}
                </Typography>
              </ListItemAnchor>
            </ListItem>
          )}
        </ListItemDropdown>
      </ListItem>
    </List>
  );
};
