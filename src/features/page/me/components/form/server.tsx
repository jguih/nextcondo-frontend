import { Locale } from "@/i18n-config";
import { ComponentProps, FC } from "react";
import { Form, FormEmail, FormFullName, FormPhone } from "./client";
import { SubmitButton } from "@/src/components/button/submit/submit";
import { getDictionary } from "@/src/features/localization/get-dictionary";
import { UsersService } from "@/src/services/nextcondo/users/server";

export const EditMeForm: FC<
  { lang: Locale } & ComponentProps<"form">
> = async ({ lang, ...props }) => {
  const d = await getDictionary(lang);
  const user = await UsersService.GetMeAsync();
  console.log(user);
  return (
    <Form {...props}>
      <FormEmail defaultValue={user?.email} label={d.auth.email} />
      <FormFullName
        label={d.page.register.input_label_fullName}
        validationMessages={{
          valueMissing: d.validation.input_validation_fullName_required,
        }}
        defaultValue={user?.fullName}
      />
      <FormPhone
        label={d.page.register.input_label_phone}
        description={d.page.register.input_description_phone}
        defaultValue={user?.phone ?? undefined}
      />
      <SubmitButton>{d.button.save}</SubmitButton>
    </Form>
  );
};
