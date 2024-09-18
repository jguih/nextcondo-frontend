import styles from "./styles.module.scss";
import { BottomNavigation } from "@/src/components/bottomNavigation/bottom-navigation";
import { Bell } from "@/src/components/icon/icons/bell";
import { Home } from "@/src/components/icon/icons/home";
import { User } from "@/src/components/icon/icons/user";
import { Link, LinkProps } from "@/src/components/link/link";
import { Typography } from "@/src/components/typography/typography";
import { buildClassNames } from "@/src/components/utils/build-class-names";
import { FC } from "react";

export const HomePageContents: FC = () => {
  return (
    <>
      <BottomNavigation>
        <NavButton selected href={"/"}>
          <Home bold size="lg" />
          <Typography tag="small">Home</Typography>
        </NavButton>
        <NavButton href={"/"}>
          <Bell bold size="lg" />
          <Typography tag="small">Notifications</Typography>
        </NavButton>
        <NavButton href={"/"}>
          <User bold size="lg" />
          <Typography tag="small">My Profile</Typography>
        </NavButton>
      </BottomNavigation>
    </>
  );
};

type NavButtonProps = LinkProps & {
  selected?: boolean;
};

const NavButton: FC<NavButtonProps> = ({ selected, ...props }) => {
  const classes = buildClassNames(
    { [styles.selected]: selected },
    styles["nav-button"]
  );
  return (
    <Link
      {...props}
      variant="light"
      color={`${selected ? "accent" : "neutral"}`}
      className={classes}
    />
  );
};
