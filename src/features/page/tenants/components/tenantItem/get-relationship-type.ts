import "server-only";
import { Dictionary } from "@/src/features/localization/types";
import { GetTenantsResponseDto } from "@/src/services/nextcondo/tenants/schemas";

export const getRelationshipType = (
  relationshipType: GetTenantsResponseDto[number]["relationshipType"],
  d: Dictionary
): string => {
  switch (relationshipType) {
    case "Tenant":
      return d.common.tenant;
    case "Manager":
      return d.common.manager;
  }
};
