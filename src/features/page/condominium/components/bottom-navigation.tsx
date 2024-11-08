import { FC } from "react";
import { BottomNavigationLink } from "@/src/components/bottomNavigation/navigation-link";
import { Typography } from "@/src/components/typography/typography";
import { Home } from "@/src/components/icon/icons/home";

export const BottomNavigationMyCondominiums: FC<{
  label: string;
  selected?: boolean;
}> = ({ label, selected }) => {
  return (
    <BottomNavigationLink href={"/condominium/mine"} selected={selected}>
      <Home bold size="lg" />
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
      <Home bold size="lg" />
      <br />
      <Typography tag="small">{label}</Typography>
    </BottomNavigationLink>
  );
};
