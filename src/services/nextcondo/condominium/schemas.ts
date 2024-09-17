import { z } from "zod";

const relationshipTypeSchema = z.union([
  z.literal("Tenant"),
  z.literal("Manager"),
]);

const addCondominiumResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional().nullable(),
  owner: z.object({
    id: z.string(),
    fullName: z.string(),
  }),
  members: z.array(
    z.object({
      user: z.object({
        id: z.string(),
        fullName: z.string(),
      }),
      relationshipType: relationshipTypeSchema,
    })
  ),
});

const getMineCondominiumResponseSchema = z.array(addCondominiumResponseSchema);

export type CondominiumDto = z.infer<typeof addCondominiumResponseSchema>;

export const schemas = {
  relationshipType: relationshipTypeSchema,
  addCondominiumResponse: addCondominiumResponseSchema,
  getMineCondominiumResponse: getMineCondominiumResponseSchema,
};
