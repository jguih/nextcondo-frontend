"use client";

import { FormProvider, useForm } from "@/src/components/form/context";
import { FC, PropsWithChildren } from "react";
import { ActionEditOccurrenceAsync } from "../../../../actions";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { useAppSnackbar } from "@/src/components/snackbar/store";

export const Form: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm();
  const lang = useLocale();
  const snackbar = useAppSnackbar((state) => state.dispatch);

  const submit = form.handleSubmitAsync(async (data) => {
    const { result, message } = await ActionEditOccurrenceAsync(data, lang);
    if (result.success) {
      snackbar(message, "success");
    } else {
      snackbar(message, "error");
    }
  });

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={submit}>
        {children}
      </form>
    </FormProvider>
  );
};
