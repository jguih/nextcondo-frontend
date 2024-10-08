"use client";

import { FormProvider, useForm } from "@/src/components/form/context";
import { FC, PropsWithChildren } from "react";
import { ActionAddOccurrenceAsync } from "../../../actions";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useRouter } from "next/navigation";
import { useLocale } from "@/src/features/localization/components/lang-provider";

export const Form: FC<
  PropsWithChildren<{ addOccurrenceAsync?: typeof ActionAddOccurrenceAsync }>
> = ({ children, addOccurrenceAsync = ActionAddOccurrenceAsync }) => {
  const form = useForm();
  const { handleSubmitAsync } = form;
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();
  const lang = useLocale();

  const handleOnSubmit = handleSubmitAsync(async (data) => {
    const { result, message } = await addOccurrenceAsync(data, lang);
    if (result.success) {
      snackbar(message, "success");
      if (result.hasData)
        router.push(`/occurrences/${result.response.data.id}`);
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
