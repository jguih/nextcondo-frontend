"use client";
import { createContext, FC, PropsWithChildren, useContext } from "react";

export type FormGroupContextState = {
  error?: boolean;
  required?: boolean;
};

const FormGroupContext = createContext<FormGroupContextState | null>(null);

export const FormGroupProvider: FC<
  PropsWithChildren<{ value: FormGroupContextState }>
> = ({ children, value }) => {
  return (
    <FormGroupContext.Provider value={value}>
      {children}
    </FormGroupContext.Provider>
  );
};

export const useFormGroupContext = () => {
  const context = useContext(FormGroupContext);
  return context;
};
