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
});

const getCommonAreasResponseDtoSchema = z.array(commonAreaDtoSchema);
export type GetCommonAreasResponseDto = z.infer<
  typeof getCommonAreasResponseDtoSchema
>;

export const schemas = {
  getCommonAreasResponseDto: getCommonAreasResponseDtoSchema,
};
