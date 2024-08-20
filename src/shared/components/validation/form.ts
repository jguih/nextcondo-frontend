"use client";
import { FormEvent, FormEventHandler } from "react";

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
      if (!input.checkValidity()) {
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
