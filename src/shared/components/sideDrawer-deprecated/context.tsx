"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface SideDrawerState {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideDrawerContext = createContext<SideDrawerState | null>(null);

export const SideDrawerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <SideDrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </SideDrawerContext.Provider>
  );
};

export const useSideDrawerContext = () => {
  const context = useContext(SideDrawerContext);
  if (!context) {
    throw Error(
      "useSideDrawerContext can only be used inside SideDrawerProvider"
    );
  }
  return context;
};
