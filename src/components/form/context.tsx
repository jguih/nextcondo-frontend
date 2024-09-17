"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { checkFormValidityFromEvent } from "../validation/utils";
import { FormAction, FormState, IFormHandler } from "./IFormHandler";

const initialState: FormState = {
  isPending: false,
  wasSubmited: false,
};

const FormContext = createContext<IFormHandler | null>(null);

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "pending": {
      return { ...state, isPending: action.payload };
    }
    case "submited": {
      return { ...state, wasSubmited: true };
    }
  }
};

export const useForm = (): IFormHandler => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmitAsync: IFormHandler["handleSubmitAsync"] = useCallback(
    (cb) => {
      return async (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch({ type: "submited" });

        if (!checkFormValidityFromEvent(event)) return;

        const formData: FormData = new FormData(event.currentTarget);
        dispatch({ type: "pending", payload: true });
        await cb(formData);
        dispatch({ type: "pending", payload: false });
      };
    },
    [dispatch]
  );

  return { ...state, dispatch, handleSubmitAsync };
};

export const FormProvider: FC<PropsWithChildren<IFormHandler>> = ({
  children,
  ...props
}) => {
  return <FormContext.Provider value={props}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormContext used outside FormProvider");
  }
  return context;
};
