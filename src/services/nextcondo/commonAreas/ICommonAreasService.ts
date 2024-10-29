import { FetchClientResponse } from "@/src/lib/fetchClient/types";
import {
  GetBookingSlotResponseDto,
  GetCommonAreaByIdResponseDto,
  GetCommonAreasResponseDto,
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
    date: string
  ) => Promise<FetchClientResponse<GetBookingSlotResponseDto>>;
  AddReservationAsync: (
    id: number,
    data: FormData
  ) => Promise<FetchClientResponse<undefined>>;
  GetReservationsAsync: () => Promise<
    FetchClientResponse<GetReservationsResponseDto>
  >;
}
