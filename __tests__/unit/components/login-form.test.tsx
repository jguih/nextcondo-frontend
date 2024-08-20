/** @jest-environment jsdom */
import { getDictionary } from "@/src/localization/dictionaries";
import { LoginForm } from "@/src/page/login/components/loginForm/server";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => {
  const router = {
    push: (url: string) => undefined,
  };
  return {
    ...jest.requireActual("next/navigation"),
    useRouter: () => router,
  };
});

describe("<LoginForm />", () => {
  it("renders", async () => {
    // Arrange
    const user = userEvent.setup();
    const d = await getDictionary("en");
    render(<LoginForm d={d} />);

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
