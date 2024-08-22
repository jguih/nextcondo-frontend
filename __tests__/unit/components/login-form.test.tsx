/** @jest-environment jsdom */
import { LoginForm } from "@/src/page/login/components/loginForm/client";
import { IAuthService } from "@/src/services/auth/IAuth";
import { GlobalServiceProvider } from "@/src/services/global-provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { FC } from "react";

jest.mock("next/navigation");

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

class FakeAuthService implements IAuthService {
  async LoginAsync() {
    return true;
  }

  async LogoutAsync() {
    return false;
  }

  async RegisterAsync() {
    return false;
  }
}

const fakeAuthService = new FakeAuthService();

const TestLoginForm: FC = () => {
  return (
    <GlobalServiceProvider AuthService={fakeAuthService}>
      <LoginForm>
        <button type="submit">submit</button>
      </LoginForm>
    </GlobalServiceProvider>
  );
};

describe("<LoginForm />", () => {
  it("redirects on successful login", async () => {
    // Arrange
    const user = userEvent.setup();
    const loginAsyncSpy = jest.spyOn(fakeAuthService, "LoginAsync");
    render(<TestLoginForm />);

    // Act
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.click(submit);

    // Assert
    expect(loginAsyncSpy).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("does not redirects on unsuccessful login", async () => {
    // Arrange
    const user = userEvent.setup();
    const loginAsyncSpy = jest.spyOn(fakeAuthService, "LoginAsync");
    loginAsyncSpy.mockImplementation(async () => false);
    render(<TestLoginForm />);

    // Act
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.click(submit);

    // Assert
    expect(loginAsyncSpy).toHaveBeenCalledTimes(1);
    expect(pushMock).not.toHaveBeenCalledWith("/");

    loginAsyncSpy.mockClear();
  });
});
