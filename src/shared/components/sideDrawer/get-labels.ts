/* eslint-disable @typescript-eslint/no-explicit-any */

import { SideDrawerContentProps } from "./side-drawer";

/**
 * @param d Dictionary
 * @returns
 */
export const getLabels = (d: any): SideDrawerContentProps["label"] => {
  const sideDrawerLabels = {
    home: d.side_drawer.home,
    commonAreas: d.side_drawer.common_areas,
    occurrences: d.side_drawer.occurrences,
    tenants: d.side_drawer.tenants,
    user: d.side_drawer.user,
    configurations: d.side_drawer.configurations,
    help: d.side_drawer.help,
    changeTheme: d.side_drawer.change_theme,
  };
  return sideDrawerLabels;
};
