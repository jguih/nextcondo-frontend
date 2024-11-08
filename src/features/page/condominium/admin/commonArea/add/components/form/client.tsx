"use client";
import { Button } from "@/src/components/button/button";
import { FieldSet } from "@/src/components/fieldSet/field-set";
import { FormProvider, useForm } from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { Label } from "@/src/components/label/label";
import { Select } from "@/src/components/select/select";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { ValidationMessages } from "@/src/components/validation/types";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import {
  format,
  getLocalizedAttribute,
} from "@/src/features/localization/utils";
import { GetCommonAreaTypesResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";
import { FC, PropsWithChildren, ReactElement, useState } from "react";
import styles from "./styles.module.scss";
import { ActionAddCommonAreaAsync } from "../../actions";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useRouter } from "next/navigation";

export const Form: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm();
  const lang = useLocale();
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();

  const handleOnSubmit = form.handleSubmitAsync(async (data) => {
    const { result, message } = await ActionAddCommonAreaAsync(data, lang);
    if (result.success) {
      snackbar(message, "success");
      router.push(`/commonAreas`);
    } else {
      snackbar(message, "error");
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleOnSubmit} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export const FormCommonAreaType: FC<{
  label: string;
  defaultValue?: number;
  commonAreaTypes: GetCommonAreaTypesResponseDto;
}> = ({ label, defaultValue, commonAreaTypes }) => {
  const lang = useLocale();
  return (
    <FormGroup>
      <Label htmlFor="common-area-type">{label}</Label>
      <Select name="typeId" id="common-area-type" defaultValue={defaultValue}>
        {commonAreaTypes.map((commonAreaType) => (
          <option key={commonAreaType.id} value={commonAreaType.id}>
            {getLocalizedAttribute(commonAreaType, "name", lang)}
          </option>
        ))}
      </Select>
    </FormGroup>
  );
};

export const FormStartTime: FC<{
  label: string;
  validationMessages: Required<Pick<ValidationMessages, "valueMissing">>;
}> = ({ label, validationMessages }) => {
  return (
    <InputValidationContainer
      id="start-time"
      validationMessages={validationMessages}
      render={({ id, isError, errorMessage, ...inputProps }) => (
        <FormGroup required error={isError}>
          <Label htmlFor={id}>{label}</Label>
          <Input
            type="time"
            id={id}
            name="startTime"
            fullWidth
            {...inputProps}
          />
          {isError && <Typography color="danger">{errorMessage}</Typography>}
        </FormGroup>
      )}
    />
  );
};

export const FormEndTime: FC<{
  label: string;
  validationMessages: Required<Pick<ValidationMessages, "valueMissing">>;
}> = ({ label, validationMessages }) => {
  return (
    <InputValidationContainer
      id="end-time"
      validationMessages={validationMessages}
      render={({ id, isError, errorMessage, ...inputProps }) => (
        <FormGroup required error={isError}>
          <Label htmlFor={id}>{label}</Label>
          <Input type="time" id={id} name="endTime" fullWidth {...inputProps} />
          {isError && <Typography color="danger">{errorMessage}</Typography>}
        </FormGroup>
      )}
    />
  );
};

export const FormTimeInterval: FC<{
  label: string;
  description: string;
  validationMessages: Required<
    Pick<ValidationMessages, "valueMissing" | "stepMismatch" | "rangeUnderflow">
  >;
}> = ({ label, description, validationMessages }) => {
  return (
    <InputValidationContainer
      id="time-interval"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup required error={isError}>
          <Label htmlFor={id}>{label}</Label>
          <Typography tag="small" muted>
            {description}
          </Typography>
          <Input
            {...inputProps}
            type="time"
            name="timeInterval"
            id={id}
            fullWidth
            step={900}
            min={"00:15"}
          />
          {isError && <Typography color="danger">{errorMessage}</Typography>}
        </FormGroup>
      )}
    />
  );
};

export const FormSlots: FC<{
  legend: string;
  description: ReactElement | ReactElement[];
  label: {
    addFacility: string;
  };
  facility: {
    legend: string;
    label: {
      namePTBR: string;
      nameEN: string;
      remove: string;
    };
    validationMessages: {
      namePTBR: Required<Pick<ValidationMessages, "valueMissing">>;
      nameEN: Required<Pick<ValidationMessages, "valueMissing">>;
    };
  };
}> = ({ legend, label, description, facility }) => {
  const [slotIds, setSlotIds] = useState<number[]>([0]);

  const appendSlot = () => {
    const last = slotIds.length > 0 ? slotIds[slotIds.length - 1] : 0;
    setSlotIds([...slotIds, last + 1]);
  };

  const removeSlot = (slotId: number) => {
    const newSlotIds = slotIds.filter((id) => id !== slotId);
    setSlotIds([...newSlotIds]);
  };

  return (
    <FieldSet required>
      <Typography tag="legend">{legend}</Typography>
      {description}
      {slotIds.map((slotId, index) => (
        <FieldSet key={slotId}>
          <Typography tag="legend">
            {format(facility.legend, { index: index + 1 })}
          </Typography>
          <InputValidationContainer
            id={`name-ptbr-${index}`}
            validationMessages={facility.validationMessages.namePTBR}
            render={({ id, isError, errorMessage, ...inputProps }) => (
              <FormGroup error={isError} required>
                <Label htmlFor={id}>{facility.label.namePTBR}</Label>
                <Input
                  id={id}
                  type="text"
                  required
                  name={`slots[${index}].name_ptbr`}
                  {...inputProps}
                />
                {isError && (
                  <Typography color="danger">{errorMessage}</Typography>
                )}
              </FormGroup>
            )}
          />
          <InputValidationContainer
            id={`name-en-${index}`}
            validationMessages={facility.validationMessages.nameEN}
            render={({ id, isError, errorMessage, ...inputProps }) => (
              <FormGroup error={isError} required>
                <Label htmlFor={id}>{facility.label.nameEN}</Label>
                <Input
                  id={id}
                  type="text"
                  required
                  name={`slots[${index}].name_en`}
                  {...inputProps}
                />
                {isError && (
                  <Typography color="danger">{errorMessage}</Typography>
                )}
              </FormGroup>
            )}
          />
          <Button
            color="danger"
            variant="light"
            onClick={() => removeSlot(slotId)}
            className={styles["delete-btn"]}
            disabled={slotIds.length === 1}
          >
            {facility.label.remove}
          </Button>
        </FieldSet>
      ))}
      <Button
        onClick={appendSlot}
        fullWidth
        variant="light"
        color="accent"
        className={styles["add-btn"]}
      >
        {label.addFacility}
      </Button>
    </FieldSet>
  );
};
