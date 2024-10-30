"use client";

import styles from "./styles.module.scss";
import { FormProvider, useForm } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { TextArea } from "@/src/components/input/textarea";
import { Label } from "@/src/components/label/label";
import { Radio } from "@/src/components/radio/radio";
import { RadioGroup } from "@/src/components/formGroup/radio/radio-group";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { TextAreaValidationContainer } from "@/src/components/validation/textarea-validation-container";
import { ValidationMessages } from "@/src/components/validation/types";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { ActionAddCondominiumAsync } from "../actions";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useLocale } from "@/src/features/localization/components/lang-provider";

export const Form: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm();
  const { handleSubmitAsync } = form;
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();
  const lang = useLocale();

  const handleOnSubmit = handleSubmitAsync(async (data) => {
    const { result, message } = await ActionAddCondominiumAsync(data, lang);
    if (result.success) {
      snackbar(message, "success");
      router.push(`/`);
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

type FormRelationshipTypeProps = {
  legend: string;
  description: string;
  manager: string;
  tenant: string;
};

export const FormRelationshipType: FC<FormRelationshipTypeProps> = ({
  legend,
  description,
  manager,
  tenant,
}) => {
  return (
    <fieldset className={styles["field-set"]}>
      <Typography tag="legend">{legend}</Typography>
      <Typography tag="small" muted>
        {description}
      </Typography>
      <RadioGroup>
        <Radio id="tenant" name="relationshipType" defaultChecked value={1} />
        <Label htmlFor="tenant">{tenant}</Label>
      </RadioGroup>
      <RadioGroup>
        <Radio id="manager" name="relationshipType" value={0} />
        <Label htmlFor="manager">{manager}</Label>
      </RadioGroup>
    </fieldset>
  );
};

type FormName = {
  label: string;
  validationMessages: Required<Pick<ValidationMessages, "valueMissing">>;
};

export const FormName: FC<FormName> = ({ label, validationMessages }) => {
  return (
    <InputValidationContainer
      id="name"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            name="name"
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

type FormDescription = {
  label: string;
};

export const FormDescription: FC<FormDescription> = ({ label }) => {
  return (
    <TextAreaValidationContainer
      id="description"
      render={({ id, errorMessage, isError, ...props }) => (
        <FormGroup error={isError}>
          <Label htmlFor={id}>{label}</Label>
          <TextArea
            id={id}
            name="name"
            maxLength={2000}
            aria-describedby={isError ? `${id}-help` : undefined}
            rows={6}
            className={styles.description}
            {...props}
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
