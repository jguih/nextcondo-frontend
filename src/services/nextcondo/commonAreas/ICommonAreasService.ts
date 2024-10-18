import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import { GetCommonAreasResponseDto } from "./schemas";

export interface ICommonAreasService {
  GetAsync: () => Promise<FetchClientResponse<GetCommonAreasResponseDto>>;
}
