/** @jest-environment jsdom */
import { getDictionary } from "@/src/localization/dictionaries";
import { FormState } from "@/src/page/login/components/loginForm/login.action";
import { LoginForm } from "@/src/page/login/components/loginForm/server";
import { render } from "@testing-library/react";

jest.mock("react-dom", () => {
  const state: FormState = { isError: false };
  const formAction = "";
  const isPending = false;

  return {
    ...jest.requireActual("react-dom"),
    useFormState: () => [state, formAction, isPending],
    useFormStatus: () => {
      return { pending: isPending };
    },
  };
});

/**
 * React 19 is required to properlly unit test this.
 *
 * Mocking useFormState don't solve the problems, because
 * in pure HTML a form's action cannot be a function.
 *
 * Action will never be called, so API request's will never
 * be made.
 */

describe("<LoginForm />", () => {
  it("renders", async () => {
    const d = await getDictionary("en");
    render(<LoginForm d={d} />);
  });
});
