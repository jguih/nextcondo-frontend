"use client";
import { FieldSet } from "@/src/components/fieldSet/field-set";
import { FormProvider, useForm } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { Label } from "@/src/components/label/label";
import { Radio } from "@/src/components/radio/radio";
import { RadioGroup } from "@/src/components/radio/radio-group";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { getLocalizedAttribute } from "@/src/features/localization/utils";
import { GetCommonAreaByIdResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";
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

export const FormFacility: FC<{
  slots: GetCommonAreaByIdResponseDto["slots"];
  legend: string;
}> = ({ slots, legend }) => {
  const lang = useLocale();
  return (
    <FieldSet>
      <Typography tag="legend">{legend}</Typography>
      {slots.map((slot, index) => (
        <RadioGroup key={slot.id}>
          <Radio
            id={`slot${slot.id}`}
            name="slotId"
            value={slot.id}
            defaultChecked={index === 0}
          />
          <Label htmlFor={`slot${slot.id}`}>
            {getLocalizedAttribute(slot, "name", lang)}
          </Label>
        </RadioGroup>
      ))}
    </FieldSet>
  );
};

export const FormDate: FC = () => {
  const now = new Date().toISOString().substring(0, 10);
  const _max = new Date();
  _max.setDate(new Date().getDate() + 30);
  const max = _max.toISOString().substring(0, 10);
  return (
    <InputValidationContainer
      id="date-field"
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>Date</Label>
          <Input
            type="date"
            defaultValue={now}
            min={now}
            max={max}
            fullWidth
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
