export interface IAuthService {
  LoginAsync: (credentials: FormData) => Promise<boolean>;
  LogoutAsync: () => Promise<boolean>;
  RegisterAsync: (user: FormData) => Promise<boolean>;
}
