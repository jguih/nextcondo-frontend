import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input as JoyInput,
} from "@mui/joy";
import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FC,
  FocusEventHandler,
  FormEventHandler,
  ReactElement,
  useRef,
  useState,
} from "react";

export type ValidationMessages = Omit<
  Partial<Record<keyof ValidityState, string>>,
  "valid"
>;

export type InputWithValidationProps = {
  label: string | ReactElement;
  name: string;
  /** @default false */
  required?: boolean;
  validationMessages?: ValidationMessages;
} & Omit<ComponentPropsWithoutRef<"input">, "name" | "required">;

export const InputWithValidation: FC<InputWithValidationProps> = ({
  label,
  name,
  required = false,
  validationMessages,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);
  const [visited, setVisited] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validate = () => {
    if (!inputRef.current) return;
    const validity = inputRef.current.validity;
    const messages = validationMessages;

    if (validity.valueMissing && messages?.valueMissing) {
      inputRef.current.setCustomValidity(messages.valueMissing);
    } else if (validity.patternMismatch && messages?.patternMismatch) {
      inputRef.current.setCustomValidity(messages.patternMismatch);
    } else if (validity.typeMismatch && messages?.typeMismatch) {
      inputRef.current.setCustomValidity(messages?.typeMismatch);
    } else if (validity.badInput && messages?.badInput) {
      inputRef.current.setCustomValidity(messages?.badInput);
    } else if (validity.rangeOverflow && messages?.rangeOverflow) {
      inputRef.current.setCustomValidity(messages?.rangeOverflow);
    } else if (validity.rangeUnderflow && messages?.rangeUnderflow) {
      inputRef.current.setCustomValidity(messages?.rangeUnderflow);
    } else if (validity.stepMismatch && messages?.stepMismatch) {
      inputRef.current.setCustomValidity(messages?.stepMismatch);
    } else if (validity.tooLong && messages?.tooLong) {
      inputRef.current.setCustomValidity(messages?.tooLong);
    } else if (validity.tooShort && messages?.tooShort) {
      inputRef.current.setCustomValidity(messages?.tooShort);
    } else {
      inputRef.current.setCustomValidity("");
    }

    if (!inputRef.current.validity.valid) {
      setError(inputRef.current.validationMessage);
    } else {
      setError(null);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = () => {
    if (visited) validate();
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = () => {
    setVisited(true);
    validate();
  };

  const onInvalid: FormEventHandler<HTMLInputElement> = () => {
    setVisited(true);
    validate();
  };

  return (
    <FormControl error={error !== null} required={required}>
      {typeof label === "string" ? <FormLabel>{label}</FormLabel> : label}
      <JoyInput
        slotProps={{
          input: {
            onChange,
            onBlur,
            onInvalid,
            ref: inputRef,
            name,
            ...props,
          },
        }}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
