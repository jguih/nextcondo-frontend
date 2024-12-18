"use client";

import { FormProvider, useForm } from "@/src/components/form/context";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { ActionEditCommonAreaAsync } from "../../actions";

export const Form: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm();
  const lang = useLocale();
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();

  const handleOnSubmit = form.handleSubmitAsync(async (data) => {
    const { result, message } = await ActionEditCommonAreaAsync(data, lang);
    if (result.success) {
      snackbar(message, "success");
      router.push(`/condominium/admin`);
    } else {
      snackbar(message, "error");
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleOnSubmit} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};
