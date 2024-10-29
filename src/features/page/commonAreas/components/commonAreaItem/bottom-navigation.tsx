import { Home as HomeIcon } from "@/src/components/icon/icons/home";
import { Typography } from "@/src/components/typography/typography";
import { FC } from "react";
import { BottomNavigationLink } from "@/src/components/bottomNavigation/navigation-link";
import { Calendar } from "@/src/components/icon/icons/calendar";

export const BottomNavigationCommonAreas: FC<{
  label: string;
  selected?: boolean;
}> = ({ label, selected }) => {
  return (
    <BottomNavigationLink href={"/commonAreas"} selected={selected}>
      <HomeIcon bold size="lg" />
      <br />
      <Typography tag="small">{label}</Typography>
    </BottomNavigationLink>
  );
};

export const BottomNavigationBookingHistory: FC<{
  label: string;
  selected?: boolean;
}> = ({ label, selected }) => {
  return (
    <BottomNavigationLink
      href={"/commonAreas/bookingHistory"}
      selected={selected}
    >
      <Calendar bold size="lg" />
      <br />
      <Typography tag="small">{label}</Typography>
    </BottomNavigationLink>
  );
};
