import { Dictionary } from "@/src/features/localization/types";
import { FC } from "react";
import { OccurrencesService } from "@/src/services/nextcondo/occurrences/server";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { Typography } from "@/src/components/typography/typography";
import { GetOccurrenceByIdResponseDto } from "@/src/services/nextcondo/occurrences/schemas";
import * as FormFields from "../../../../components/form/form-fields";
import { Form } from "./client";

export const EditOccurrenceForm: FC<{
  d: Dictionary;
  occurrence: GetOccurrenceByIdResponseDto;
}> = async ({ d, occurrence }) => {
  const result = await OccurrencesService.GetTypesAsync();
  const occurrenceTypes =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Form>
      <FormFields.Title
        label={d.page["occurrences/[id]/edit"].input_label_title}
        validationMessages={{
          valueMissing:
            d.page["occurrences/[id]/edit"].input_validation_title_required,
        }}
        defaultValue={occurrence.title}
      />
      <FormFields.Description
        label={d.page["occurrences/[id]/edit"].input_label_description}
        defaultValue={occurrence.description ?? undefined}
      />
      <FormFields.OccurrenceType
        occurrenceTypes={occurrenceTypes}
        label={d.page["occurrences/[id]/edit"].input_label_category}
        defaultValue={occurrence.occurrenceType.id}
      />
      <input id="occurrence-id" name="id" defaultValue={occurrence.id} hidden />
      <SubmitButton>
        <Typography>{d.button.save}</Typography>
      </SubmitButton>
    </Form>
  );
};
