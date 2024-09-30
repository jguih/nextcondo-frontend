"use client";

import { DialogActions } from "@/src/components/dialog/actions";
import { Button } from "@/src/components/button/button";
import { FC, Fragment, ReactElement, useRef } from "react";
import { Dialog } from "@/src/components/dialog/dialog";
import { DialogHeader } from "@/src/components/dialog/header";
import { DialogContent } from "@/src/components/dialog/content";
import { deleteOccurrenceAsync } from "../../actions";

export const ActionDelete: FC<{
  label: string;
  dialog: {
    title: ReactElement | ReactElement[];
    content: ReactElement | ReactElement[];
    labelClose: string;
    labelDelete: string;
  };
  occurrenceId: string;
}> = ({ label, dialog, occurrenceId }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const onDelete = async () => {
    await deleteOccurrenceAsync(occurrenceId);
  };

  return (
    <Fragment>
      <Dialog ref={dialogRef}>
        <DialogHeader>{dialog.title}</DialogHeader>
        <DialogContent>{dialog.content}</DialogContent>
        <DialogActions>
          <Button variant="light" onClick={closeModal}>
            {dialog.labelClose}
          </Button>
          <Button color="danger" autoFocus onClick={onDelete}>
            {dialog.labelDelete}
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="light" color="danger" onClick={openModal}>
        {label}
      </Button>
    </Fragment>
  );
};
