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
import { getValidationMessageFromValidity } from "./utils";

export type ValidationMessages = Omit<
  Partial<Record<keyof ValidityState, string>>,
  "valid"
>;

type RenderFnProps = {
  id: string;
  isError: boolean;
  errorMessage: string | null;
  ref: MutableRefObject<HTMLInputElement | null>;
} & Pick<ComponentProps<"input">, "onChange" | "onBlur" | "onInvalid">;

export type InputValidationContainerProps = {
  validationMessages?: ValidationMessages;
  id: string;
  render: (props: RenderFnProps) => ReactElement;
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
    const message = getValidationMessageFromValidity(
      validity,
      validationMessages
    );

    inputRef.current.setCustomValidity(message);

    if (!validity.valid) {
      setError(inputRef.current.validationMessage);
    } else {
      setError(null);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = () => {
    if (visited) inputRef.current?.checkValidity();
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = () => {
    setVisited(true);
    inputRef.current?.checkValidity();
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
    onBlur,
    onInvalid,
    ref: inputRef,
  });
};
