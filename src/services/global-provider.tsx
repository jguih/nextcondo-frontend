"use client";
import { FC, PropsWithChildren } from "react";
import { Services, ServicesProvider } from "./provider";
import { useAuthService } from "./auth/client";

export const GlobalServiceProvider: FC<PropsWithChildren> = ({ children }) => {
  const AuthService = useAuthService();

  const services: Services = {
    AuthService: AuthService,
  };

  return <ServicesProvider {...services}>{children}</ServicesProvider>;
};
