"use client";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { getEnv } from "./get-env.action";

type Env = Awaited<ReturnType<typeof getEnv>>;

const EnvContext = createContext<Env>({
  NEXT_PUBLIC_NEXTCONDOAPI_URL: "",
});

export const EnvProvider: FC<PropsWithChildren<{ env: Env }>> = ({
  children,
  env,
}) => {
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = () => {
  return useContext(EnvContext);
};
