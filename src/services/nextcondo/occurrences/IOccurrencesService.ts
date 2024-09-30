import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import {
  AddOccurrenceResponseDto,
  GetOccurrenceByIdResponseDto,
  GetOccurrenceResponseDto,
  GetOccurrenceTypesResponseDto,
} from "./schemas";

export interface IOccurrencesService {
  GetAsync: () => Promise<FetchClientResponse<GetOccurrenceResponseDto>>;
  AddAsync: (
    data: FormData
  ) => Promise<FetchClientResponse<AddOccurrenceResponseDto>>;
  GetTypesAsync: () => Promise<
    FetchClientResponse<GetOccurrenceTypesResponseDto>
  >;
  GetByIdAsync: (
    id: string
  ) => Promise<FetchClientResponse<GetOccurrenceByIdResponseDto>>;
  DeleteAsync: (id: string) => Promise<FetchClientResponse<undefined>>;
}
