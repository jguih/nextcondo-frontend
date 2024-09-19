import { FC } from "react";
import {
  CondominiumServices,
  CondominiumServicesOccurrences,
  CondominiumServicesPlaceholder,
  CondominiumServicesReservations,
  CondominiumServicesTenants,
} from "./condominium-services";
import { Dictionary } from "@/src/features/localization/types";

export const HomePageContents: FC<{ d: Dictionary }> = ({ d }) => {
  return (
    <CondominiumServices title={d.page.home.services}>
      <CondominiumServicesReservations
        label={d.page.home.service_label_reservations}
      />
      <CondominiumServicesOccurrences
        label={d.page.home.service_label_occurrences}
      />
      <CondominiumServicesTenants label={d.page.home.service_label_tenants} />
      <CondominiumServicesPlaceholder label={d.side_drawer.configurations} />
    </CondominiumServices>
  );
};
