export type ValidationState<Data, ErrorState> =
  | {
      isError: true;
      errors: ErrorState;
    }
  | {
      isError: false;
      data: Data;
    };
