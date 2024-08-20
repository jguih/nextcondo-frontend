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
import { CircularProgress } from "../components/circularProgress/circular-progress";

const EnvContext = createContext<Awaited<ReturnType<typeof getEnv>>>({
  NEXT_PUBLIC_SUPABASE_URL: "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
  NEXT_PUBLIC_NEXTCONDOAPI_URL: "",
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
    return (
      <div style={{ width: "100%" }}>
        <CircularProgress
          size="lg"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </div>
    );
  }

  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = () => {
  return useContext(EnvContext);
};
