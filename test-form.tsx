"use client";
import { FC } from "react";
import { InputValidationContainer } from "./src/shared/components/validation/input-validation-container";
import { FormGroup } from "./src/shared/components/formGroup/form-group";
import { Label } from "./src/shared/components/label/label";
import { Input } from "./src/shared/components/input/input";
import { HelperText } from "./src/shared/components/helperText/helper-text";

export const TestForm: FC = () => {
  return (
    <InputValidationContainer
      id="my-input"
      render={({ id, errorMessage, isError, ...inputProps }) => (
        <FormGroup>
          <Label required htmlFor={id}>
            My Label
          </Label>
          <Input
            id={id}
            required
            error={isError}
            aria-describedby={isError ? `${id}-help` : undefined}
            {...inputProps}
          />
          {isError && (
            <HelperText id={`${id}-help`} error>
              {errorMessage}
            </HelperText>
          )}
        </FormGroup>
      )}
    />
  );
};
