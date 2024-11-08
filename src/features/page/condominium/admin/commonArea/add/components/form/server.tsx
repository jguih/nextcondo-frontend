import { FC } from "react";
import {
  Form,
  FormCommonAreaType,
  FormEndTime,
  FormSlots,
  FormStartTime,
  FormTimeInterval,
} from "./client";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { Dictionary } from "@/src/features/localization/types";
import { format } from "@/src/features/localization/utils";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { Typography } from "@/src/components/typography/typography";
import { List } from "@/src/components/list/list";
import { ListItem } from "@/src/components/list/items";
import { getUserTimezoneOffsetMinutes } from "@/src/lib/utils/timezone-utils";

export const AddCommonAreaForm: FC<{ d: Dictionary }> = async ({ d }) => {
  const pageDic = d.page["condominium/admin/commonArea/add"];
  const result = await CommonAreasService.GetTypesAsync();
  const commonAreaTypes =
    result.success && result.hasData ? result.response.data : [];
  const firstCommonAreaType =
    commonAreaTypes.length > 0 ? commonAreaTypes[0].id : undefined;

  return (
    <Form>
      <FormCommonAreaType
        label={pageDic.input_label_common_area_type}
        defaultValue={firstCommonAreaType}
        commonAreaTypes={commonAreaTypes}
      />
      <FormStartTime
        label={pageDic.input_label_start_time}
        validationMessages={{
          valueMissing: pageDic.input_validation_time_required,
        }}
      />
      <FormEndTime
        label={pageDic.input_label_end_time}
        validationMessages={{
          valueMissing: pageDic.input_validation_time_required,
        }}
      />
      <FormTimeInterval
        label={pageDic.input_label_time_interval}
        description={pageDic.input_description_time_interval}
        validationMessages={{
          valueMissing: pageDic.input_validation_time_interval_required,
          stepMismatch: format(
            pageDic.input_validation_time_interval_step_mismatch,
            { step: "00:15", examples: "00:30, 01:00, 01:15, 02:30" }
          ),
          rangeUnderflow: format(
            pageDic.input_validation_time_interval_range_underflow,
            { min: "00:15" }
          ),
        }}
      />
      <FormSlots
        legend={pageDic.fieldset_legend_facility_plural}
        label={{ addFacility: pageDic.action_label_add_facility }}
        facility={{
          legend: pageDic.fieldset_legend_facility,
          label: {
            nameEN: pageDic.input_label_facility_name_en,
            namePTBR: pageDic.input_label_facility_name_ptbr,
            remove: d.button.remove,
          },
          validationMessages: {
            nameEN: { valueMissing: pageDic.input_validation_name_en_required },
            namePTBR: {
              valueMissing: pageDic.input_validation_name_ptbr_required,
            },
          },
        }}
        description={
          <>
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
              {
                pageDic.fieldset_description_facilities_laundry_room_example_title
              }
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
          </>
        }
      />
      <input
        id="timezone-offset-minutes"
        name="timezoneOffsetMinutes"
        defaultValue={getUserTimezoneOffsetMinutes()}
        hidden
      />
      <SubmitButton>{d.button.save}</SubmitButton>
    </Form>
  );
};
