import { z } from "zod";

const relationshipTypeSchema = z.union([
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
      relationshipType: relationshipTypeSchema,
    })
  ),
});
const getMineCondominiumResponseSchema = z.array(condominiumDtoSchema);
const getMineCurrentReponseSchema = condominiumDtoSchema;

export type CondominiumDto = z.infer<typeof condominiumDtoSchema>;

export const schemas = {
  relationshipType: relationshipTypeSchema,
  getMineResponse: getMineCondominiumResponseSchema,
  getMineCurrentReponse: getMineCurrentReponseSchema,
};
