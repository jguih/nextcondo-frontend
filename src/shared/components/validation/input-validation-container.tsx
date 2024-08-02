"use client";
import {
  ChangeEventHandler,
  ComponentProps,
  FC,
  FocusEventHandler,
  FormEventHandler,
  MutableRefObject,
  ReactElement,
  useRef,
  useState,
} from "react";

export type ValidationMessages = Omit<
  Partial<Record<keyof ValidityState, string>>,
  "valid"
>;

export type InputValidationContainerProps = {
  validationMessages?: ValidationMessages;
  id: string;
  render: (
    props: {
      id: string;
      isError: boolean;
      errorMessage: string | null;
      ref: MutableRefObject<HTMLInputElement | null>;
    } & Pick<ComponentProps<"input">, "onChange" | "onBlur" | "onInvalid">
  ) => ReactElement;
};

export const InputValidationContainer: FC<InputValidationContainerProps> = ({
  validationMessages = {},
  render,
  id,
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

  return render({
    id,
    isError: error !== null,
    errorMessage: error,
    onChange,
    onInvalid,
    onBlur,
    ref: inputRef,
  });
};
