import { ListItem } from "@/src/components/list/items";
import { List } from "@/src/components/list/list";
import { Typography } from "@/src/components/typography/typography";
import { Dictionary } from "@/src/features/localization/types";
import { FC, Fragment } from "react";

export const FormSlotsDescription: FC<{ d: Dictionary }> = ({ d }) => {
  const pageDic = d.page["condominium/admin/commonArea/add"];

  return (
    <Fragment>
      <Typography tag="small" muted>
        {pageDic.fieldset_description_facilities}
      </Typography>
      <br />
      <br />
      <Typography tag="small">
        {pageDic.fieldset_description_facilities_gym_example_title}
      </Typography>
      <List spacing="none">
        {pageDic.fieldset_description_facilities_gym_example_list
          .split(";")
          .map((text, index) => (
            <ListItem key={text + index}>
              <Typography tag="small">{text.trim()}</Typography>
            </ListItem>
          ))}
      </List>
      <br />
      <Typography tag="small">
        {pageDic.fieldset_description_facilities_laundry_room_example_title}
      </Typography>
      <List spacing="none">
        {pageDic.fieldset_description_facilities_laundry_room_example_list
          .split(";")
          .map((text, index) => (
            <ListItem key={text + index}>
              <Typography tag="small">{text.trim()}</Typography>
            </ListItem>
          ))}
      </List>
    </Fragment>
  );
};
