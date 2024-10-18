import { z } from "zod";

const commonAreaDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  timeInterval: z.string(),
});

const getCommonAreasResponseDtoSchema = z.array(commonAreaDtoSchema);
export type GetCommonAreasResponseDto = z.infer<
  typeof getCommonAreasResponseDtoSchema
>;

export const schemas = {
  getCommonAreasResponseDto: getCommonAreasResponseDtoSchema,
};
