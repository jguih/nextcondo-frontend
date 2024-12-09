"use client";

import { FormProvider, useForm } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { Label } from "@/src/components/label/label";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { ValidationMessages } from "@/src/components/validation/types";
import { FC, PropsWithChildren } from "react";
import { ActionJoinCondominiumAsync } from "../../actions";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useRouter } from "next/navigation";

export const Form: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm();
  const { handleSubmitAsync } = form;
  const lang = useLocale();
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();

  const handleOnSubmit = handleSubmitAsync(async (data) => {
    const { result, message } = await ActionJoinCondominiumAsync(data, lang);
    if (result.success) {
      snackbar(message, "success");
      router.push(`/condominium/mine`);
      router.refresh();
    } else {
      snackbar(message, "error");
    }
  });

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={handleOnSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};

export const FormId: FC<{
  validationMessages: Required<Pick<ValidationMessages, "valueMissing">>;
  label: string;
}> = ({ validationMessages, label }) => {
  return (
    <InputValidationContainer
      id="id"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            name="id"
            type="text"
            maxLength={100}
            aria-describedby={isError ? `${id}-help` : undefined}
            {...inputProps}
          />
          {isError && (
            <Typography tag="small" color="danger" id={`${id}-help`}>
              {errorMessage}
            </Typography>
          )}
        </FormGroup>
      )}
    />
  );
};
