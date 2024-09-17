"use client";
import { FormEvent } from "react";
import { ValidationMessages } from "./types";

/**
 * Checks for validity state from an event. It'll focus the first invalid input in the form when invalid and will blur current fucused input on submit.
 */
export const checkFormValidityFromEvent: (
  event: FormEvent<HTMLFormElement>
) => boolean = (event) => {
  if (!event.currentTarget.checkValidity()) {
    // Focus first invalid input
    const inputs = event.currentTarget.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      if (!input.validity.valid) {
        input.focus();
        break;
      }
    }
    return false;
  } else {
    // Form is valid
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
    return true;
  }
};

export const getValidationMessageFromValidity = (
  validity: ValidityState,
  messages: ValidationMessages
): string => {
  if (validity.valueMissing && messages.valueMissing) {
    return messages.valueMissing;
  }
  if (validity.patternMismatch && messages.patternMismatch) {
    return messages.patternMismatch;
  }
  if (validity.typeMismatch && messages.typeMismatch) {
    return messages.typeMismatch;
  }
  if (validity.badInput && messages.badInput) {
    return messages.badInput;
  }
  if (validity.rangeOverflow && messages.rangeOverflow) {
    return messages.rangeOverflow;
  }
  if (validity.rangeUnderflow && messages.rangeUnderflow) {
    return messages.rangeUnderflow;
  }
  if (validity.stepMismatch && messages.stepMismatch) {
    return messages.stepMismatch;
  }
  if (validity.tooLong && messages.tooLong) {
    return messages.tooLong;
  }
  if (validity.tooShort && messages.tooShort) {
    return messages.tooShort;
  }
  return "";
};
