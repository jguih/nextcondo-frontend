"use client";

import { Button } from "@/src/components/button/button";
import { FC, Fragment, ReactElement, useRef } from "react";
import { Dialog } from "@/src/components/dialog/dialog";
import { ActionDeleteOccurrenceAsync } from "../../../actions";
import { useAppSnackbar } from "@/src/components/snackbar/store";
import { useRouter } from "next/navigation";
import { ActionDeleteProvider, useActionDeleteContext } from "./context";
import { useLocale } from "@/src/features/localization/components/lang-provider";

export const ActionDelete: FC<{
  label: string;
  dialogBody: ReactElement | ReactElement[];
  occurrenceId: string;
}> = ({ label, dialogBody, occurrenceId }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const snackbar = useAppSnackbar((state) => state.dispatch);
  const router = useRouter();
  const lang = useLocale();

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const onDelete = async () => {
    const { result, message } = await ActionDeleteOccurrenceAsync(
      occurrenceId,
      lang
    );
    if (result.success) {
      snackbar(message, "success");
      router.push("/occurrences");
    } else {
      snackbar(message, "error");
    }
  };

  return (
    <ActionDeleteProvider closeModal={closeModal} onDelete={onDelete}>
      <Dialog ref={dialogRef}>{dialogBody}</Dialog>
      <Button variant="light" color="danger" onClick={openModal}>
        {label}
      </Button>
    </ActionDeleteProvider>
  );
};

export const ActionDeleteDialogActions: FC<{
  label: { close: string; delete: string };
}> = ({ label }) => {
  const { closeModal, onDelete } = useActionDeleteContext();
  return (
    <Fragment>
      <Button variant="light" onClick={closeModal}>
        {label.close}
      </Button>
      <Button color="danger" autoFocus onClick={onDelete}>
        {label.delete}
      </Button>
    </Fragment>
  );
};
