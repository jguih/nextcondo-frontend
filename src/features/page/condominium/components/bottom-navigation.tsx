import { FC } from "react";
import { BottomNavigationLink } from "@/src/components/bottomNavigation/navigation-link";
import { Typography } from "@/src/components/typography/typography";
import { Buildings } from "@/src/components/icon/icons/buildings";
import { BuildingPlus } from "@/src/components/icon/icons/building-plus";

export const BottomNavigationMyCondominiums: FC<{
  label: string;
  selected?: boolean;
}> = ({ label, selected }) => {
  return (
    <BottomNavigationLink href={"/condominium/mine"} selected={selected}>
      <Buildings bold size="lg" />
      <br />
      <Typography tag="small">{label}</Typography>
    </BottomNavigationLink>
  );
};

export const BottomNavigationAddCondominium: FC<{
  label: string;
  selected?: boolean;
}> = ({ label, selected }) => {
  return (
    <BottomNavigationLink href={"/condominium/add"} selected={selected}>
      <BuildingPlus bold size="lg" />
      <br />
      <Typography tag="small">{label}</Typography>
    </BottomNavigationLink>
  );
};
