import { Dictionary } from "@/src/features/localization/types";
import { FC } from "react";
import { Form } from "./client";
import * as FormFields from "../../../components/form/form-fields";
import { OccurrencesService } from "@/src/services/nextcondo/occurrences/server";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { Typography } from "@/src/components/typography/typography";

export const AddOccurrenceForm: FC<{ d: Dictionary }> = async ({ d }) => {
  const result = await OccurrencesService.GetTypesAsync();
  const occurrenceTypes =
    result.success && result.hasData ? result.response.data : [];

  return (
    <Form>
      <FormFields.Title
        label={d.page["occurrences/add"].input_label_title}
        validationMessages={{
          valueMissing:
            d.page["occurrences/add"].input_validation_title_required,
        }}
      />
      <FormFields.Description
        label={d.page["occurrences/add"].input_label_description}
      />
      <FormFields.OccurrenceType
        occurrenceTypes={occurrenceTypes}
        label={d.page["occurrences/add"].input_label_category}
      />
      <SubmitButton>
        <Typography>{d.page["occurrences/add"].create_occurrence}</Typography>
      </SubmitButton>
    </Form>
  );
};
