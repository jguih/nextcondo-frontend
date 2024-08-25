import { User } from "@/src/services/users/schemas";

export interface IUsersService {
  GetMeAsync: () => Promise<User | undefined>;
}
