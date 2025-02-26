"use client";
import { FormProvider, useForm } from "@/src/components/form/context";
import { useLocale } from "@/src/features/localization/components/lang-provider";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren } from "react";
import { ActionAddCommonAreaAsync } from "../../actions";

export const Form: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm();
  const lang = useLocale();
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();

  const handleOnSubmit = form.handleSubmitAsync(async (data) => {
    const { result, message } = await ActionAddCommonAreaAsync(data, lang);
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
