"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type BookingFormState = {
  slotId: number;
  date: string;
  startAt?: string;
};

export type BookingFormContextProps = {
  state: BookingFormState;
  dispatch: (state: BookingFormState) => void;
};

const BookingContext = createContext<BookingFormContextProps | null>(null);

export const useBookingForm = (
  init: Pick<BookingFormState, "slotId" | "date">
): BookingFormContextProps => {
  const [formState, setFormState] = useState<BookingFormState>({
    slotId: init.slotId,
    date: init.date,
  });

  return {
    state: formState,
    dispatch: (newState) => setFormState(newState),
  };
};

export const BookingFormProvider: FC<
  PropsWithChildren<BookingFormContextProps>
> = ({ children, ...props }) => {
  return (
    <BookingContext.Provider value={{ ...props }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingFormContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingFormContext used outside provider");
  }
  return context;
};
