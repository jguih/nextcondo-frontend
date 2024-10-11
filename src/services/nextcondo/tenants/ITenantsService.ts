import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { GetTenantsResponseDto } from "./schemas";

export interface ITenantsService {
  /**
   * Returns a list of all tenants for user's current condominium.
   * @returns `Array` of tenants.
   */
  GetAsync: () => Promise<FetchClientResponse<GetTenantsResponseDto>>;
}
