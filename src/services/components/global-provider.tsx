"use client";
import { FC, PropsWithChildren } from "react";
import { Services, ServicesProvider } from "./provider";
import { useAuthService } from "../nextcondo/auth/client";
import { NextCondoCommonAreasService } from "../nextcondo/commonAreas/client";

type GlobalServiceProviderProps = PropsWithChildren<
  { nextcondoBackendPublicUrl: string } & Partial<Services>
>;

export const GlobalServiceProvider: FC<GlobalServiceProviderProps> = ({
  children,
  nextcondoBackendPublicUrl,
  ...overrideServices
}) => {
  const AuthService = useAuthService({ nextcondoBackendPublicUrl });
  const CommonAreasService = new NextCondoCommonAreasService(
    nextcondoBackendPublicUrl
  );
  const services: Services = {
    AuthService,
    CommonAreasService,
    ...overrideServices,
  };

  return <ServicesProvider {...services}>{children}</ServicesProvider>;
};
