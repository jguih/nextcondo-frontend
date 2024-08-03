"use client";
import { FormEventHandler } from "react";

export const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
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
