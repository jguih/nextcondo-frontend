import { User } from "@/src/services/nextcondo/users/schemas";

export interface IUsersService {
  GetMeAsync: () => Promise<User | undefined>;
  IsOwnerOrManagerOfCurrentCondominium: () => Promise<boolean>;
}
