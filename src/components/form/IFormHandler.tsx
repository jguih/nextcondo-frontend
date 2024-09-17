import { Dispatch, FormEventHandler } from "react";

export type FormState = {
  /**
   * Is `true` when callback passed to `handleSubmitAsync` is pending.
   * @default false
   */
  isPending: boolean;
  /**
   * Is set to `true` on form submittion and never changes after.
   * @default false
   */
  wasSubmited: boolean;
};

/**
 * Form reducer dispatch action.
 */
export type FormAction =
  | {
      type: "pending";
      payload: boolean;
    }
  | { type: "submited" };

/**
 * Function that handles async form submittion. Automatically updates form states.
 * @param cb Callback that handles the form submittion. An instance of `FormData` is passed to it.
 * @returns `FormEventHandler` To be used on form's `onSubmit` callback.
 */
export type HandleSubmitAsyncFunction = (
  cb: (data: FormData) => Promise<void>
) => FormEventHandler<HTMLFormElement>;

/**
 * Provides form state and funtions to help manage form submittion and state management.
 */
export interface IFormHandler extends FormState {
  dispatch: Dispatch<FormAction>;
  handleSubmitAsync: HandleSubmitAsyncFunction;
}
