import { z } from "zod";

const relationshipTypeSchema = z.union([
  z.literal("Tenant"),
  z.literal("Manager"),
]);

const tenantsDtoSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  relationshipType: relationshipTypeSchema,
});

const getTenantsResponseDtoSchema = z.array(tenantsDtoSchema);
export type GetTenantsResponseDto = z.infer<typeof getTenantsResponseDtoSchema>;

export const schemas = {
  getTenantsResponseDto: getTenantsResponseDtoSchema,
};
