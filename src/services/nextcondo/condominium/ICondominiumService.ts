import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import {
  GetMineCondominiumResponse,
  GetMineCurrentCondominiumResponse,
  SetMineCurrentCondominiumResponse,
} from "./schemas";

export interface ICondominiumService {
  /**
   * Creates a new condominium for current user.
   * @param data `FormData` with required information to create a new condominium.
   * @returns `true` if success.
   */
  AddAsync: (data: FormData) => Promise<FetchClientResponse<undefined>>;
  /**
   * Returns an `Array` of all condominiums that the current user is in.
   */
  GetMineAsync: () => Promise<FetchClientResponse<GetMineCondominiumResponse>>;
  /**
   * Fetch current active condominium for user.
   */
  GetMineCurrentAsync: () => Promise<
    FetchClientResponse<GetMineCurrentCondominiumResponse>
  >;
  SetMineCurrentAsync: (
    id: string
  ) => Promise<FetchClientResponse<SetMineCurrentCondominiumResponse>>;
}
