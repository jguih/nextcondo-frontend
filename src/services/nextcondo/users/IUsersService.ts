import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { User } from "@/src/services/nextcondo/users/schemas";

export interface IUsersService {
  GetMeAsync: () => Promise<User | undefined>;
  IsOwnerOrManagerOfCurrentCondominium: () => Promise<boolean>;
  EditMeAsync: (data: FormData) => Promise<FetchClientResponse<undefined>>;
}
