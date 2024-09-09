/**
 * Handles user authentication flows.
 */
export interface IAuthService {
  /**
   * Handles user login flow.
   * @param credentials `FormData` containing credentials required for user login.
   * @returns `true` if login is successfull. `false` otherwise.
   */
  LoginAsync: (credentials: FormData) => Promise<boolean>;
  /**
   * Handles user logout flow.
   * @returns `true` if logout was successfull. `false` otherwise.
   */
  LogoutAsync: () => Promise<boolean>;
  /**
   * Handles user registration.
   * @param user `FormData` containing user details required for registration.
   * @returns `true` if user was created. `false` otherwise.
   */
  RegisterAsync: (user: FormData) => Promise<boolean>;
}
