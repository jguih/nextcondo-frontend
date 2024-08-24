"use client";

import { SetupWorker } from "msw/browser";
import { FC, PropsWithChildren, useEffect } from "react";
import { getBrowserHandlers } from "../nextjs/browserHandlers";
import { useEnv } from "@/src/shared/env/context";

export const MSWProvider: FC<PropsWithChildren> = ({ children }) => {
  const { NEXT_PUBLIC_NEXTCONDOAPI_URL } = useEnv();

  useEffect(() => {
    const startMock = async () => {
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV === "development"
      ) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { worker } = require("../../mocks/nextjs/browser");
        (worker as SetupWorker).use(
          ...getBrowserHandlers(NEXT_PUBLIC_NEXTCONDOAPI_URL)
        );
        await worker.start();
      }
    };

    startMock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
