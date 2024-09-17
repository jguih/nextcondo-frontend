"use client";
import { FC, PropsWithChildren } from "react";
import { Services, ServicesProvider } from "./provider";
import { useAuthService } from "../nextcondo/auth/client";
import { useCondominiumService } from "../nextcondo/condominium/client";

type GlobalServiceProviderProps = PropsWithChildren<
  { nextcondoBackendPublicUrl: string } & Partial<Services>
>;

export const GlobalServiceProvider: FC<GlobalServiceProviderProps> = ({
  children,
  nextcondoBackendPublicUrl,
  ...overrideServices
}) => {
  const AuthService = useAuthService({ nextcondoBackendPublicUrl });
  const CondominiumService = useCondominiumService({
    nextcondoBackendPublicUrl,
  });
  const services: Services = {
    AuthService: AuthService,
    CondominiumService: CondominiumService,
    ...overrideServices,
  };

  return <ServicesProvider {...services}>{children}</ServicesProvider>;
};
