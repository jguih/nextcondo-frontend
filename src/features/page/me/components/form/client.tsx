"use client";

import { FormProvider, useForm } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { Label } from "@/src/components/label/label";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { ValidationMessages } from "@/src/components/validation/types";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { ComponentProps, FC } from "react";
import { ActionEditMeAsync } from "../../actions";

export const Form: FC<ComponentProps<"form">> = ({ children, ...props }) => {
  const form = useForm();
  const { handleSubmitAsync } = form;
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const lang = useLocale();

  const handleOnSubmit = handleSubmitAsync(async (data) => {
    const { result, message } = await ActionEditMeAsync(data, lang);
    if (result.success) {
      snackbar(message, "success");
    } else {
      snackbar(message, "error");
    }
  });

  return (
    <FormProvider {...form}>
      <form {...props} noValidate onSubmit={handleOnSubmit}>
        {children}
      </form>
    </FormProvider>
  );
};

type FullNameProps = {
  label: string;
  validationMessages: Required<Pick<ValidationMessages, "valueMissing">>;
  defaultValue?: string;
};

export const FormFullName: FC<FullNameProps> = ({
  label,
  validationMessages,
  defaultValue,
}) => {
  return (
    <InputValidationContainer
      id="full-name"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            name="fullname"
            type="text"
            defaultValue={defaultValue}
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

type PhoneProps = {
  label: string;
  description: string;
  defaultValue?: string;
};

export const FormPhone: FC<PhoneProps> = ({
  label,
  description,
  defaultValue,
}) => {
  return (
    <InputValidationContainer
      id="phone"
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError}>
          <Label htmlFor={id}>{label}</Label>
          <Typography tag="small" muted id={`${id}-help`}>
            {description}
          </Typography>
          <Input
            id={id}
            name="phone"
            type="tel"
            aria-describedby={`${id}-help`}
            defaultValue={defaultValue}
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
