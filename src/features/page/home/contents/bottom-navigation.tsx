import { Home } from "@/src/components/icon/icons/home";
import { Typography } from "@/src/components/typography/typography";
import { FC, Fragment } from "react";
import { Bell } from "@/src/components/icon/icons/bell";
import { User } from "@/src/components/icon/icons/user";
import { BottomNavigationLink } from "@/src/components/bottomNavigation/navigation-link";

type HomeBottomNavigationProps = {
  labels: {
    home: string;
    notifications: string;
    myProfile: string;
  };
};

export const HomeBottomNavigation: FC<HomeBottomNavigationProps> = ({
  labels,
}) => {
  return (
    <Fragment>
      <BottomNavigationLink selected href={"/"}>
        <Home bold size="lg" />
        <br />
        <Typography tag="small">{labels.home}</Typography>
      </BottomNavigationLink>
      <BottomNavigationLink href={"/"}>
        <Bell bold size="lg" />
        <br />
        <Typography tag="small">{labels.notifications}</Typography>
      </BottomNavigationLink>
      <BottomNavigationLink href={"/"}>
        <User bold size="lg" />
        <br />
        <Typography tag="small">{labels.myProfile}</Typography>
      </BottomNavigationLink>
    </Fragment>
  );
};
