export type ValidationMessages = Omit<
  Partial<Record<keyof ValidityState, string>>,
  "valid"
>;
