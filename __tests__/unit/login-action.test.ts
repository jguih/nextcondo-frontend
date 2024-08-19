import {
  FormState,
  login,
} from "@/src/page/login/components/loginForm/login.action";

describe("Server Action | Login", () => {
  it("", async () => {
    // Arrange
    const initialState: FormState = { isError: false };
    const credentials: FormData = new FormData();
    credentials.append("email", "test@test.com");
    credentials.append("password", "test");
    const response = await login(initialState, credentials, "pt-BR");
  });
});
