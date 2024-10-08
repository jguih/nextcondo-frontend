"use client";

import styles from "./styles.module.scss";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { TextArea } from "@/src/components/input/textarea";
import { Label } from "@/src/components/label/label";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { TextAreaValidationContainer } from "@/src/components/validation/textarea-validation-container";
import { GetOccurrenceTypesResponseDto } from "@/src/services/nextcondo/occurrences/schemas";
import { ValidationMessages } from "@/src/components/validation/types";
import { Select } from "@/src/components/select/select";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { FC } from "react";
import { getOccurrenceTypeName } from "../../utils";

export const Title: FC<{
  label: string;
  validationMessages: Pick<ValidationMessages, "valueMissing">;
  defaultValue?: string;
}> = ({ label, validationMessages, defaultValue }) => {
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

export const Description: FC<{
  label: string;
  defaultValue?: string;
}> = ({ label, defaultValue }) => {
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

export const OccurrenceType: FC<{
  occurrenceTypes: GetOccurrenceTypesResponseDto;
  label: string;
  defaultValue?: number;
}> = ({ occurrenceTypes, label, defaultValue }) => {
  const lang = useLocale();
  return (
    <FormGroup>
      <Label htmlFor="occurrence-type">{label}</Label>
      <Select
        name="occurrenceTypeId"
        id="occurrence-type"
        defaultValue={defaultValue}
      >
        {occurrenceTypes.map((occurrenceType) => (
          <option key={occurrenceType.id} value={occurrenceType.id}>
            {getOccurrenceTypeName(occurrenceType, lang)}
          </option>
        ))}
      </Select>
    </FormGroup>
  );
};
