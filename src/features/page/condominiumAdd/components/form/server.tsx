import { FC } from "react";
import {
  Form as ClientForm,
  FormDescription,
  FormName,
  FormRelationshipType,
} from "./client";
import { Dictionary } from "@/src/features/localization/types";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { Typography } from "@/src/components/typography/typography";

export const Form: FC<{ d: Dictionary }> = ({ d }) => {
  return (
    <ClientForm>
      <FormRelationshipType
        legend={d.page["condominium/add"].input_label_relationship_type}
        description={
          d.page["condominium/add"].input_description_relationship_type
        }
        manager={d.common.manager}
        tenant={d.common.tenant}
      />
      <FormName
        label={d.common.name}
        validationMessages={{
          valueMissing:
            d.page["condominium/add"].input_validation_name_required,
        }}
      />
      <FormDescription label={d.common.description} />
      <SubmitButton>
        <Typography>{d.page["condominium/add"].create_condominium}</Typography>
      </SubmitButton>
    </ClientForm>
  );
};
