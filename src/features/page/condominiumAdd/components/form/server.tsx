import { FC } from "react";
import {
  Form as ClientForm,
  FormDescription,
  FormName,
  FormRelationshipType,
  FormUser,
} from "./client";
import { Dictionary } from "@/src/features/localization/types";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { Typography } from "@/src/components/typography/typography";
import { User } from "@/src/services/nextcondo/users/schemas";

export const Form: FC<{ d: Dictionary; user: User }> = ({ d, user }) => {
  return (
    <ClientForm>
      <FormRelationshipType
        legend={d.page.add_condominium.relationship_type}
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
      <FormUser user={user} />
      <SubmitButton>
        <Typography>{d.page.add_condominium.submit}</Typography>
      </SubmitButton>
    </ClientForm>
  );
};
