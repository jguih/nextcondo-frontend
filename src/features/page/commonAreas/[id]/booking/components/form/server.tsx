import { Dictionary } from "@/src/features/localization/types";
import { FC } from "react";
import { Form, FormDate, FormFacility, FormTimeSlots } from "./client";
import { GetCommonAreaByIdResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { format } from "@/src/features/localization/utils";

export const CommonAreaBookingForm: FC<{
  d: Dictionary;
  commonArea: GetCommonAreaByIdResponseDto;
}> = async ({ d, commonArea }) => {
  const firstSlotId =
    commonArea.slots.length > 0 ? commonArea.slots[0].id : undefined;
  const _dateNow = new Date();
  const dateNow = _dateNow.toISOString().substring(0, 10);
  const _dateMax = new Date();
  _dateMax.setDate(new Date().getDate() + 30);
  const dateMax = _dateMax.toISOString().substring(0, 10);

  if (!firstSlotId) {
    throw new Error("Common area doesn't have any slots");
  }

  return (
    <Form
      defaultSlotId={firstSlotId}
      defaultDate={dateNow}
      commonAreaId={commonArea.id}
    >
      <FormFacility
        slots={commonArea.slots}
        legend={d.page["commonAreas/[id]/booking"].fieldset_legend_facility}
      />
      <FormDate
        dateNow={dateNow}
        dateMax={dateMax}
        label={d.page["commonAreas/[id]/booking"].input_label_date}
        description={format(
          d.page["commonAreas/[id]/booking"].input_description_date,
          {
            from: _dateNow.toLocaleDateString(),
            to: _dateMax.toLocaleDateString(),
          }
        )}
        validationMessages={{
          rangeOverflow:
            d.page["commonAreas/[id]/booking"].input_validation_date_required,
          rangeUnderflow:
            d.page["commonAreas/[id]/booking"].input_validation_date_required,
          valueMissing:
            d.page["commonAreas/[id]/booking"].input_validation_date_required,
        }}
      />
      <FormTimeSlots
        commonAreaId={commonArea.id}
        validationMessages={{
          valueMissing:
            d.page["commonAreas/[id]/booking"]
              .input_validation_schedule_required,
        }}
        error={d.common.resource_does_not_exist}
        legend={d.page["commonAreas/[id]/booking"].fieldset_legend_schedule}
      />
      <SubmitButton>{d.button.submit}</SubmitButton>
    </Form>
  );
};
