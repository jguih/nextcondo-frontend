import { ValidationState } from "./ValidationState";

export interface IValidator<Data> {
  validate: (
    formData: FormData
  ) => Promise<ValidationState<Data, ErrorState<Data>>>;
  validatePartial: <Key extends keyof Data>(
    field: Key,
    data: any
  ) => Promise<ValidationState<Data[Key], ErrorState<Data[Key]>>>;
}

type ErrorState<Data> = Data extends object
  ? Record<keyof Data, string[]>
  : string[];
