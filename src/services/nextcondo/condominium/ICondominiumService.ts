import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { CondominiumDto } from "./schemas";

export interface ICondominiumService {
  /**
   * Creates a new condominium for current user.
   * @param data `FormData` with required information to create a new condominium.
   * @returns `true` if success.
   */
  AddAsync: (data: FormData) => Promise<boolean>;
  /**
   * Returns an `Array` of all condominiums that the current user is in.
   * @returns `FetchClientResponse`
   */
  GetMineAsync: () => Promise<FetchClientResponse<CondominiumDto[]>>;
}
