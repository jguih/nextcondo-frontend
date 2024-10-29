"use client";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { IAuthService } from "../nextcondo/auth/IAuthService";
import { ICondominiumService } from "../nextcondo/condominium/ICondominiumService";
import { ICommonAreasService } from "../nextcondo/commonAreas/ICommonAreasService";

export type Services = {
  AuthService: IAuthService;
  CondominiumService: ICondominiumService;
  CommonAreasService: ICommonAreasService;
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
