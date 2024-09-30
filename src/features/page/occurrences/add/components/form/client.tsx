"use client";

import styles from "./styles.module.scss";
import { FormProvider, useForm } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { TextArea } from "@/src/components/input/textarea";
import { Label } from "@/src/components/label/label";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { TextAreaValidationContainer } from "@/src/components/validation/textarea-validation-container";
import { GetOccurrenceTypesResponseDto } from "@/src/services/nextcondo/occurrences/schemas";
import { FC, PropsWithChildren } from "react";
import { getOccurrenceTypeName } from "../../../utils";
import { ValidationMessages } from "@/src/components/validation/types";
import { Select } from "@/src/components/select/select";
import { addOccurrenceAsync } from "../../../actions";
import { useLocale } from "@/src/features/localization/components/lang-provider";

export const Form: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm();
  const { handleSubmitAsync } = form;

  const handleOnSubmit = handleSubmitAsync(async (data) => {
    await addOccurrenceAsync(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleOnSubmit} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

type FormTitleProps = {
  label: string;
  validationMessages: Pick<ValidationMessages, "valueMissing">;
};

export const FormTitle: FC<FormTitleProps> = ({
  label,
  validationMessages,
}) => {
  return (
    <InputValidationContainer
      id={"title"}
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup required error={isError}>
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            name="title"
            type="text"
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

export const FormDescription: FC<{ label: string }> = ({ label }) => {
  return (
    <TextAreaValidationContainer
      id={"description"}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError}>
          <Label htmlFor={id}>{label}</Label>
          <TextArea
            id={id}
            name="description"
            maxLength={4000}
            aria-describedby={isError ? `${id}-help` : undefined}
            rows={4}
            className={styles.description}
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

type FormOccurrenceTypeProps = {
  occurrenceTypes: GetOccurrenceTypesResponseDto;
  label: string;
};

export const FormOccurrenceType: FC<FormOccurrenceTypeProps> = ({
  occurrenceTypes,
  label,
}) => {
  const lang = useLocale();
  return (
    <FormGroup>
      <Label htmlFor="occurrence-type">{label}</Label>
      <Select name="occurrenceTypeId" id="occurrence-type">
        {occurrenceTypes.map((occurrenceType) => (
          <option key={occurrenceType.id} value={occurrenceType.id}>
            {getOccurrenceTypeName(occurrenceType, lang)}
          </option>
        ))}
      </Select>
    </FormGroup>
  );
};
