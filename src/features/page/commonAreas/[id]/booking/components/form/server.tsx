import { Dictionary } from "@/src/features/localization/types";
import { FC } from "react";
import { Form, FormDate, FormFacility } from "./client";
import { GetCommonAreaByIdResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";

export const CommonAreaBookingForm: FC<{
  d: Dictionary;
  commonArea: GetCommonAreaByIdResponseDto;
}> = async ({ d, commonArea }) => {
  return (
    <Form>
      <FormFacility
        slots={commonArea.slots}
        legend={d.page["commonAreas/[id]/booking"].fieldset_legend_facility}
      />
      <FormDate />
    </Form>
  );
};
