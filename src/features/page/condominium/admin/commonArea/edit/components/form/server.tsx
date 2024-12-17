import { Dictionary } from "@/src/features/localization/types";
import { CommonAreasService } from "@/src/services/nextcondo/commonAreas/server";
import { FC } from "react";
import { Form } from "./client";
import { GetCommonAreaByIdResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";
import {
  FormCommonAreaType,
  FormEndTime,
  FormStartTime,
  FormTimeInterval,
} from "../../../components/form-fields";
import { format } from "@/src/features/localization/utils";

export const EditCommonAreaForm: FC<{
  d: Dictionary;
  commonArea: GetCommonAreaByIdResponseDto;
}> = async ({ d, commonArea }) => {
  const pageDic = d.page["condominium/admin/commonArea/add"];
  const result = await CommonAreasService.GetTypesAsync();
  const commonAreaTypes =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Form>
      <FormCommonAreaType
        label={pageDic.input_label_common_area_type}
        defaultValue={commonArea.type.id}
        commonAreaTypes={commonAreaTypes}
      />
      <FormStartTime
        label={pageDic.input_label_start_time}
        validationMessages={{
          valueMissing: pageDic.input_validation_time_required,
        }}
        defaultValue={commonArea.startTime}
      />
      <FormEndTime
        label={pageDic.input_label_end_time}
        validationMessages={{
          valueMissing: pageDic.input_validation_time_required,
        }}
        defaultValue={commonArea.endTime}
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
        defaultValue={commonArea.timeInterval}
      />
    </Form>
  );
};
