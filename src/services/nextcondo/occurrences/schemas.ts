import { z } from "zod";

const occurrenceDtoSchema = z.object({
  id: z.string(),
  creator: z.object({ id: z.string(), fullName: z.string() }),
  condominium: z.object({ id: z.string() }),
  occurrenceType: z.object({
    id: z.number(),
    name_EN: z.string(),
    name_PTBR: z.string(),
  }),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
});

const occurrenceTypeDtoSchema = z.object({
  id: z.number(),
  name_EN: z.string(),
  name_PTBR: z.string(),
  description_EN: z.string(),
  description_PTBR: z.string(),
});

const getOccurrenceResponseDtoSchema = z.array(occurrenceDtoSchema);
export type GetOccurrenceResponseDto = z.infer<
  typeof getOccurrenceResponseDtoSchema
>;

const addOccurrenceResponseDtoSchema = z.object({ id: z.string() });
export type AddOccurrenceResponseDto = z.infer<
  typeof addOccurrenceResponseDtoSchema
>;

const getOccurrenceTypesResponseDtoSchema = z.array(occurrenceTypeDtoSchema);
export type GetOccurrenceTypesResponseDto = z.infer<
  typeof getOccurrenceTypesResponseDtoSchema
>;

const getOccurrenceByIdResponseDtoSchema = occurrenceDtoSchema;
export type GetOccurrenceByIdResponseDto = z.infer<
  typeof getOccurrenceByIdResponseDtoSchema
>;

export const schemas = {
  getOccurrenceResponseDto: getOccurrenceResponseDtoSchema,
  addOccurrenceResponseDto: addOccurrenceResponseDtoSchema,
  getOccurrenceTypesResponseDto: getOccurrenceTypesResponseDtoSchema,
  getOccurrenceByIdResponseDto: getOccurrenceByIdResponseDtoSchema,
};
