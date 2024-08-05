"use client";
import { FormEventHandler } from "react";

/**
 * Submit function that handles custom form validation. It'll focus the first invalid input in the form when invalid and will blur current fucused input on submit.
 */
export const handleSubmitWithValidation: FormEventHandler<HTMLFormElement> = (
  event
) => {
  if (!event.currentTarget.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    // Focus first invalid input
    const inputs = event.currentTarget.getElementsByTagName("input");
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      if (!input.checkValidity()) {
        input.focus();
        break;
      }
    }
  } else {
    // Form is valid
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
  }
};
