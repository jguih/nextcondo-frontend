"use client";
import { FieldSet } from "@/src/components/fieldSet/field-set";
import {
  FormProvider,
  useForm,
  useFormContext,
} from "@/src/components/form/context";
import { FormGroup } from "@/src/components/formGroup/form-group";
import { Input } from "@/src/components/input/input";
import { Label } from "@/src/components/label/label";
import { Radio } from "@/src/components/radio/radio";
import { RadioGroup } from "@/src/components/formGroup/radio/radio-group";
import { Typography } from "@/src/components/typography/typography";
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { getLocalizedAttribute } from "@/src/features/localization/utils";
import { GetCommonAreaByIdResponseDto } from "@/src/services/nextcondo/commonAreas/schemas";
import { useBookingSlot } from "@/src/services/nextcondo/commonAreas/useCase/use-booking-slot";
import { ChangeEvent, ChangeEventHandler, FC, PropsWithChildren } from "react";
import {
  BookingFormProvider,
  useBookingForm,
  useBookingFormContext,
} from "./context";
import { CircularProgress } from "@/src/components/circularProgress/circular-progress";
import { ValidationMessages } from "@/src/components/validation/types";
import styles from "./styles.module.scss";
import { ActionAddReservationAsync } from "../../actions";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useRouter } from "next/navigation";
import { getLocalTime } from "../../../../get-local-time";

export const Form: FC<
  PropsWithChildren<{
    defaultSlotId: number;
    defaultDate: string;
    commonAreaId: number;
  }>
> = ({ children, defaultSlotId, defaultDate, commonAreaId }) => {
  const form = useForm();
  const { handleSubmitAsync } = form;
  const bookingForm = useBookingForm({
    slotId: defaultSlotId,
    date: defaultDate,
  });
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();
  const lang = useLocale();

  const handleOnSubmit = handleSubmitAsync(async (data) => {
    const { result, message } = await ActionAddReservationAsync(
      commonAreaId,
      data,
      lang
    );
    if (result.success) {
      snackbar(message, "success");
      router.push(`/commonAreas`);
    } else {
      snackbar(message, "error");
    }
  });

  return (
    <FormProvider {...form}>
      <BookingFormProvider {...bookingForm}>
        <form noValidate onSubmit={handleOnSubmit}>
          {children}
        </form>
      </BookingFormProvider>
    </FormProvider>
  );
};

export const FormFacility: FC<{
  slots: GetCommonAreaByIdResponseDto["slots"];
  legend: string;
}> = ({ slots, legend }) => {
  const lang = useLocale();
  const { state, dispatch } = useBookingFormContext();
  const { slotId } = state;

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    dispatch({ ...state, slotId: Number(value) ?? 0, startAt: undefined });
  };

  return (
    <FieldSet>
      <Typography tag="legend">{legend}</Typography>
      {slots.map((slot) => (
        <RadioGroup key={slot.id}>
          <Radio
            id={`slot${slot.id}`}
            name="slotId"
            value={slot.id}
            checked={slotId === slot.id}
            onChange={handleOnChange}
          />
          <Label htmlFor={`slot${slot.id}`}>
            {getLocalizedAttribute(slot, "name", lang)}
          </Label>
        </RadioGroup>
      ))}
    </FieldSet>
  );
};

export const FormDate: FC<{
  label: string;
  description: string;
  dateNow: string;
  dateMax: string;
  validationMessages: Required<
    Pick<
      ValidationMessages,
      "rangeOverflow" | "rangeUnderflow" | "valueMissing"
    >
  >;
}> = ({ label, description, dateNow, dateMax, validationMessages }) => {
  const { state, dispatch } = useBookingFormContext();
  const { date } = state;

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    onChange?: ChangeEventHandler<HTMLInputElement>
  ) => {
    const value = event.target.value;
    dispatch({ ...state, date: value, startAt: undefined });
    onChange?.(event);
  };

  return (
    <InputValidationContainer
      id="date-field"
      validationMessages={validationMessages}
      render={({ id, errorMessage, isError, onChange, ...inputProps }) => (
        <FormGroup error={isError} required>
          <Label htmlFor={id}>{label}</Label>
          <Typography tag="small" muted>
            {description}
          </Typography>
          <Input
            type="date"
            id={id}
            name="date"
            value={date}
            required
            min={dateNow}
            max={dateMax}
            fullWidth
            aria-describedby={isError ? `${id}-help` : undefined}
            onChange={(event) => handleOnChange(event, onChange)}
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

export const FormTimeSlots: FC<{
  commonAreaId: number;
  legend: string;
  validationMessages: Required<Pick<ValidationMessages, "valueMissing">>;
  error: string;
}> = ({ commonAreaId, legend, validationMessages, error }) => {
  const { wasSubmitted } = useFormContext();
  const { state, dispatch } = useBookingFormContext();
  const swr = useBookingSlot({
    commonAreaId,
    slotId: state.slotId,
    date: state.date,
  });
  const bookingSlot =
    swr.data?.success && swr.data.hasData ? swr.data.response.data : undefined;
  const isError = wasSubmitted && !state.startAt;

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    dispatch({ ...state, startAt: value });
  };

  if (swr.isLoading) {
    return (
      <FieldSet required className={styles["grid-fieldset"]}>
        <Typography tag="legend">{legend}</Typography>
        {new Array(8).fill(null).map((_, index) => (
          <RadioGroup key={index} disabled>
            <Radio id={`slot-${index}`} name="startAt" />
            <Label htmlFor={`slot-${index}`}>
              <CircularProgress />
            </Label>
          </RadioGroup>
        ))}
      </FieldSet>
    );
  }

  if (!bookingSlot || swr.error) {
    return (
      <FieldSet required isError>
        <Typography tag="legend">{legend}</Typography>
        <Typography color="danger">{error}</Typography>
      </FieldSet>
    );
  }

  return (
    <FieldSet required isError={isError} className={styles["grid-fieldset"]}>
      <Typography tag="legend">{legend}</Typography>
      {bookingSlot.slots.map((slot, index) => {
        const localTime = getLocalTime(slot.startAt, bookingSlot.date);
        return (
          <RadioGroup key={slot.startAt} disabled={!slot.available}>
            <Radio
              id={`slot-${slot.startAt}`}
              name="startAt"
              value={slot.startAt}
              required={index === 0}
              checked={state.startAt === slot.startAt}
              onChange={handleOnChange}
            />
            <Label htmlFor={`slot-${slot.startAt}`}>{localTime}</Label>
          </RadioGroup>
        );
      })}
      {isError && (
        <Typography color="danger" className={styles["validation-error"]}>
          {validationMessages.valueMissing}
        </Typography>
      )}
    </FieldSet>
  );
};
