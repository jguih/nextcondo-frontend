import { FC } from "react";
import { Form, FormId } from "./client";
import { Dictionary } from "@/src/features/localization/types";
import { SubmitButton } from "@/src/components/button/submit/submit";

export const EnterCondominiumForm: FC<{ d: Dictionary }> = ({ d }) => {
  return (
    <Form>
      <FormId
        validationMessages={{
          valueMissing: d.page["condominium/add"].input_validation_id_required,
        }}
        label={d.page["condominium/add"].input_label_id}
      />
      <SubmitButton>{d.page["condominium/add"].enter_condominium}</SubmitButton>
    </Form>
  );
};
