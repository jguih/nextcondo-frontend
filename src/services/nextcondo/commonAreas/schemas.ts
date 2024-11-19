import { z } from "zod";

const commonAreaTypeSchema = z.object({
  id: z.number(),
  name_EN: z.string(),
  name_PTBR: z.string(),
});

const commonAreaSlotSchema = z.object({
  id: z.number(),
  name_EN: z.string(),
  name_PTBR: z.string(),
});

const commonAreaDtoSchema = z.object({
  id: z.number(),
  type: commonAreaTypeSchema,
  startTime: z.string(),
  endTime: z.string(),
  timeInterval: z.string(),
  slots: z.array(commonAreaSlotSchema),
  coverImageURL: z.string(),
});

const timeSlotDtoSchema = z.object({
  startAt: z.string(),
  available: z.boolean(),
});

const bookingSlotDtoSchema = z.object({
  date: z.string(),
  slots: z.array(timeSlotDtoSchema),
});

const reservationDtoSchema = z.object({
  id: z.number(),
  date: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  status: z.union([
    z.literal("Completed"),
    z.literal("In Progress"),
    z.literal("Confirmed"),
    z.literal(""),
  ]),
  commonArea: z.object({
    id: z.number(),
    name_EN: z.string(),
    name_PTBR: z.string(),
  }),
  slot: z.object({
    id: z.number(),
    name_EN: z.string(),
    name_PTBR: z.string(),
  }),
});

const getCommonAreasResponseDtoSchema = z.array(commonAreaDtoSchema);
export type GetCommonAreasResponseDto = z.infer<
  typeof getCommonAreasResponseDtoSchema
>;

const getCommonAreaByIdResponseDtoSchema = commonAreaDtoSchema;
export type GetCommonAreaByIdResponseDto = z.infer<
  typeof getCommonAreaByIdResponseDtoSchema
>;

const getBookingSlotResponseDtoSchema = bookingSlotDtoSchema;
export type GetBookingSlotResponseDto = z.infer<
  typeof getBookingSlotResponseDtoSchema
>;

const getReservationsResponseDtoSchema = z.array(reservationDtoSchema);
export type GetReservationsResponseDto = z.infer<
  typeof getReservationsResponseDtoSchema
>;

const getCommonAreaTypesResponseDtoSchema = z.array(commonAreaTypeSchema);
export type GetCommonAreaTypesResponseDto = z.infer<
  typeof getCommonAreaTypesResponseDtoSchema
>;

export const schemas = {
  getCommonAreasResponseDto: getCommonAreasResponseDtoSchema,
  getCommonAreaByIdResponseDto: getCommonAreaByIdResponseDtoSchema,
  getBookingSlotResponseDto: getBookingSlotResponseDtoSchema,
  getReservationsResponseDto: getReservationsResponseDtoSchema,
  getCommonAreaTypesResponseDto: getCommonAreaTypesResponseDtoSchema,
};
