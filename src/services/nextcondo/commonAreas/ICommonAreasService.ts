import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import {
  GetCommonAreaByIdResponseDto,
  GetCommonAreasResponseDto,
} from "./schemas";

export interface ICommonAreasService {
  GetAsync: () => Promise<FetchClientResponse<GetCommonAreasResponseDto>>;
  GetByIdAsync: (
    id: number
  ) => Promise<FetchClientResponse<GetCommonAreaByIdResponseDto>>;
}
