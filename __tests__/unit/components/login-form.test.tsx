/** @jest-environment jsdom */
import { LoginForm } from "@/src/page/login/components/loginForm/client";
import { GlobalServiceProvider } from "@/src/services/global-provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FC } from "react";

jest.mock("next/navigation", () => {
  const router = {
    push: (url: string) => undefined,
  };
  return {
    ...jest.requireActual("next/navigation"),
    useRouter: () => router,
  };
});

const TestLoginForm: FC = () => {
  return (
    <GlobalServiceProvider>
      <LoginForm>
        <button type="submit">submit</button>
      </LoginForm>
    </GlobalServiceProvider>
  );
};

describe("<LoginForm />", () => {
  it("renders", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<TestLoginForm />);

    // Act
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    await screen.findByRole("button", { name: /login/i });

    await user.type(email, "test@test.com");
    await user.type(password, "12345678");

    // Assert
    expect(email).toHaveValue("test@test.com");
    expect(password).toHaveValue("12345678");
  });
});
