"use client";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export type FormState = {
  isPending: boolean;
  isError: boolean;
  isSubmited: boolean;
  isSuccess: boolean;
};

type FormAction =
  | {
      type: "pending" | "error" | "submited" | "success";
      payload: boolean;
    }
  | { type: "reset" };

type FormContextProps = FormState & {
  dispatch: Dispatch<FormAction>;
};

const initialState: FormState = {
  isPending: false,
  isError: false,
  isSubmited: false,
  isSuccess: false,
};

const FormContext = createContext<FormContextProps>({
  ...initialState,
  dispatch: () => {},
});

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "error": {
      return { ...state, isError: action.payload };
    }
    case "pending": {
      return { ...state, isPending: action.payload };
    }
    case "submited": {
      return { ...state, isSubmited: action.payload };
    }
    case "success": {
      return { ...state, isSuccess: action.payload };
    }
    case "reset": {
      return { ...initialState };
    }
  }
};

export const useForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return { ...state, dispatch };
};

export const FormProvider: FC<PropsWithChildren<FormContextProps>> = ({
  children,
  ...props
}) => {
  return <FormContext.Provider value={props}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  return context;
};
