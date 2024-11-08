import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import {
  GetBookingSlotResponseDto,
  GetCommonAreaByIdResponseDto,
  GetCommonAreasResponseDto,
  GetCommonAreaTypesResponseDto,
  GetReservationsResponseDto,
} from "./schemas";

export interface ICommonAreasService {
  GetAsync: () => Promise<FetchClientResponse<GetCommonAreasResponseDto>>;
  GetByIdAsync: (
    id: number
  ) => Promise<FetchClientResponse<GetCommonAreaByIdResponseDto>>;
  GetBookingSlotAsync: (
    id: number,
    slotId: number,
    date: string,
    timezoneOffsetMinutes: number
  ) => Promise<FetchClientResponse<GetBookingSlotResponseDto>>;
  AddReservationAsync: (
    id: number,
    data: FormData
  ) => Promise<FetchClientResponse<undefined>>;
  GetReservationsAsync: () => Promise<
    FetchClientResponse<GetReservationsResponseDto>
  >;
  GetTypesAsync: () => Promise<
    FetchClientResponse<GetCommonAreaTypesResponseDto>
  >;
  AddAsync: (data: FormData) => Promise<FetchClientResponse<undefined>>;
}
