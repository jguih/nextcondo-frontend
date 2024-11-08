import { z } from "zod";

const relationshipTypeDtoSchema = z.union([
  z.literal("Tenant"),
  z.literal("Manager"),
]);

const condominiumDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  owner: z.object({
    id: z.string(),
    fullName: z.string(),
  }),
  members: z.array(
    z.object({
      id: z.string(),
      fullName: z.string(),
      relationshipType: relationshipTypeDtoSchema,
    })
  ),
});

const getMineResponseSchema = z.array(condominiumDtoSchema);
export type GetMineCondominiumResponse = z.infer<typeof getMineResponseSchema>;

const getMineCurrentResponseSchema = condominiumDtoSchema;
export type GetMineCurrentCondominiumResponse = z.infer<
  typeof getMineCurrentResponseSchema
>;

const setMineCurrentResponseSchema = condominiumDtoSchema;
export type SetMineCurrentCondominiumResponse = z.infer<
  typeof setMineCurrentResponseSchema
>;

export const schemas = {
  getMine: getMineResponseSchema,
  getMineCurrent: getMineCurrentResponseSchema,
  setMineCurrentResponse: setMineCurrentResponseSchema,
};
