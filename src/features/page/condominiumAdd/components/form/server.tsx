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
        legend={d.page.add_condominium.relationship_type}
        description={d.page.add_condominium.relationship_type_description}
        manager={d.page.add_condominium.manager}
        tenant={d.page.add_condominium.tenant}
      />
      <FormName
        label={d.page.add_condominium.name}
        validationMessages={{
          valueMissing: d.page.add_condominium.name_required,
        }}
      />
      <FormDescription label={d.page.add_condominium.description} />
      <SubmitButton>
        <Typography>{d.page.add_condominium.submit}</Typography>
      </SubmitButton>
    </ClientForm>
  );
};
