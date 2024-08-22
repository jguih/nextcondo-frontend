"use client";
import { FC, PropsWithChildren } from "react";
import { Services, ServicesProvider } from "./provider";
import { useAuthService } from "./auth/client";

export const GlobalServiceProvider: FC<
  PropsWithChildren<Partial<Services>>
> = ({ children, ...overrideServices }) => {
  const AuthService = useAuthService();

  const services: Services = {
    AuthService: AuthService,
    ...overrideServices,
  };

  return <ServicesProvider {...services}>{children}</ServicesProvider>;
};
