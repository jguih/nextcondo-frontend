"use client";

import { FormProvider, useForm } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { Label } from "@/src/components/label/label";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { ValidationMessages } from "@/src/components/validation/types";
import { FC, PropsWithChildren } from "react";

export const Form: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm();
  const { handleSubmitAsync } = form;

  const handleOnSubmit = handleSubmitAsync(async () => {});

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
