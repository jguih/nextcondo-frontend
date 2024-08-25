import "server-only";
import { createFetchClient, IFetchClient } from "@/src/data/fetchClient/client";
import { JsonStrategy } from "@/src/data/fetchClient/strategy";
import { IAuthService } from "./IAuthService";
import { authSchema } from "./schemas";
import { getNextCondoApiUrl } from "@/src/shared/env/utils";

export class NextCondoApiAuthService implements IAuthService {
  client: IFetchClient;

  constructor() {
    this.client = createFetchClient(getNextCondoApiUrl());
  }

  async LoginAsync(credentials: FormData): Promise<boolean> {
    const result = await this.client.postAsync({
      endpoint: "/Auth/login",
      strategy: new JsonStrategy(authSchema.login),
      body: credentials,
    });
    return result.success;
  }

  async LogoutAsync(): Promise<boolean> {
    const result = await this.client.getAsync({
      endpoint: "/Auth/logout",
      strategy: new JsonStrategy(authSchema.logout),
      credentials: "include",
    });
    return result.success;
  }

  async RegisterAsync(user: FormData): Promise<boolean> {
    const result = await this.client.postAsync({
      endpoint: "/Auth/register",
      strategy: new JsonStrategy(authSchema.register),
      body: user,
    });
    return result.success;
  }
}

export const AuthService = new NextCondoApiAuthService();
