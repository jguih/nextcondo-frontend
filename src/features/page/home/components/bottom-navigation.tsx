import { Home as HomeIcon } from "@/src/components/icon/icons/home";
import { Typography } from "@/src/components/typography/typography";
import { FC } from "react";
import { Bell } from "@/src/components/icon/icons/bell";
import { User } from "@/src/components/icon/icons/user";
import { BottomNavigationLink } from "@/src/components/bottomNavigation/navigation-link";

export const HomeBottomNavigationHome: FC<{
  label: string;
  selected?: boolean;
}> = ({ label, selected = false }) => {
  return (
    <BottomNavigationLink selected={selected} href={"/"}>
      <HomeIcon bold size="lg" />
      <br />
      <Typography tag="small">{label}</Typography>
    </BottomNavigationLink>
  );
};

export const HomeBottomNavigationNotifications: FC<{
  label: string;
  selected?: boolean;
}> = ({ label, selected = false }) => {
  return (
    <BottomNavigationLink selected={selected} href={"/"}>
      <Bell bold size="lg" />
      <br />
      <Typography tag="small">{label}</Typography>
    </BottomNavigationLink>
  );
};

export const HomeBottomNavigationMyProfile: FC<{
  label: string;
  selected?: boolean;
}> = ({ label, selected = false }) => {
  return (
    <BottomNavigationLink selected={selected} href={"/me"}>
      <User bold size="lg" />
      <br />
      <Typography tag="small">{label}</Typography>
    </BottomNavigationLink>
  );
};
