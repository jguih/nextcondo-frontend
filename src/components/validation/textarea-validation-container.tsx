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
import { ValidationMessages } from "./types";

type RenderFnProps = {
  id: string;
  isError: boolean;
  errorMessage: string | null;
  ref: MutableRefObject<HTMLTextAreaElement | null>;
} & Pick<ComponentProps<"textarea">, "onChange" | "onBlur" | "onInvalid">;

export type TextAreaValidationContainerProps = {
  validationMessages?: ValidationMessages;
  id: string;
  render: (props: RenderFnProps) => ReactElement;
};

export const TextAreaValidationContainer: FC<
  TextAreaValidationContainerProps
> = ({ validationMessages = {}, render, id }) => {
  const [error, setError] = useState<string | null>(null);
  const [visited, setVisited] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const validate = () => {
    if (!textareaRef.current) return;

    const validity = textareaRef.current.validity;
    const message = getValidationMessageFromValidity(
      validity,
      validationMessages
    );

    textareaRef.current.setCustomValidity(message);

    if (!validity.valid) {
      setError(textareaRef.current.validationMessage);
    } else {
      setError(null);
    }
  };

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = () => {
    if (visited) validate();
    textareaRef.current?.checkValidity();
  };

  const onBlur: FocusEventHandler<HTMLTextAreaElement> = () => {
    setVisited(true);
    validate();
    textareaRef.current?.checkValidity();
  };

  const onInvalid: FormEventHandler<HTMLTextAreaElement> = () => {
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
    ref: textareaRef,
  });
};
