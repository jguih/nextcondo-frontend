"use client";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { IAuthService } from "../auth/IAuthService";

export type Services = {
  AuthService: IAuthService;
};

const ServicesContext = createContext<Services | null>(null);

export const ServicesProvider: FC<PropsWithChildren<Services>> = ({
  children,
  ...services
}) => {
  return (
    <ServicesContext.Provider value={{ ...services }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): Services => {
  const context = useContext(ServicesContext);
  if (context === null) {
    throw new Error("useServices called outside ServicesProvider");
  }
  return context;
};
