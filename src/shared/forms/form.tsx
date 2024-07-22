import { Box, BoxProps } from "@mui/joy";
import { FC, FormEventHandler } from "react";

export const FormWithValidation: FC<BoxProps<"form">> = (props) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
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
    }
  };

  return (
    <Box component={"form"} onSubmit={handleSubmit} noValidate {...props} />
  );
};
