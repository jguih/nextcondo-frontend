"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { getEnv } from "./get-env.action";
import { LinearProgress } from "@mui/joy";

const EnvContext = createContext<Awaited<ReturnType<typeof getEnv>>>({
  NEXT_PUBLIC_SUPABASE_URL: "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
});

export const EnvProvider: FC<PropsWithChildren> = ({ children }) => {
  const [env, setEnv] = useState<Awaited<ReturnType<typeof getEnv>> | null>(
    null
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await getEnv();
      setEnv(response);
    });
  }, []);

  if (isPending || !env) {
    return <LinearProgress />;
  }

  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = () => {
  return useContext(EnvContext);
};
