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

const getMineSchema = z.array(condominiumDtoSchema);
export type GetCondominiumMine = z.infer<typeof getMineSchema>;

const getMineCurrentSchema = condominiumDtoSchema;
export type GetCondominiumMineCurrent = z.infer<typeof getMineCurrentSchema>;

export const schemas = {
  getMine: getMineSchema,
  getMineCurrent: getMineCurrentSchema,
};
