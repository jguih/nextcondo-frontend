/** @jest-environment jsdom */
import { InputValidationContainer } from "@/src/components/validation/input-validation-container";
import { ValidationMessages } from "@/src/components/validation/types";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

describe("<InputValidationContainer />", () => {
  it("display required field message on blur", async () => {
    const user = userEvent.setup();
    const validationMessages: Required<
      Pick<ValidationMessages, "valueMissing">
    > = {
      valueMissing: "Name is required!",
    };
    render(
      <InputValidationContainer
        id="test-input"
        validationMessages={validationMessages}
        render={({ id, isError, errorMessage, ...inputProps }) => (
          <div>
            <label htmlFor={id}>Name</label>
            <input
              type="text"
              id={id}
              required
              aria-describedby={`${id}-help`}
              {...inputProps}
            />
            {isError && <small id={`${id}-help`}>{errorMessage}</small>}
          </div>
        )}
      />
    );

    await user.type(screen.getByLabelText("Name"), "[Tab]");

    expect(
      screen.getByText(validationMessages.valueMissing)
    ).toBeInTheDocument();
  });
});
