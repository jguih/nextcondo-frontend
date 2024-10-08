import { createContext, FC, PropsWithChildren, useContext } from "react";

type ActionDeleteContextState = {
  closeModal: () => void;
  onDelete: () => void;
};

const ActionDeleteContext = createContext<ActionDeleteContextState | null>(
  null
);

export const ActionDeleteProvider: FC<
  PropsWithChildren<ActionDeleteContextState>
> = ({ children, ...state }) => {
  return (
    <ActionDeleteContext.Provider value={{ ...state }}>
      {children}
    </ActionDeleteContext.Provider>
  );
};

export const useActionDeleteContext = (): ActionDeleteContextState => {
  const context = useContext(ActionDeleteContext);
  if (!context) {
    throw new Error(
      "useActionDeleteContext called outside ActionDeleteProvider"
    );
  }
  return context;
};
