import type { ModalProps } from "@mantine/core";
import { Modal as MantineModal } from "@mantine/core";
import React from "react";

export interface IModalProperties extends ModalProps {
  withoutHeader?: boolean;
}

export const Modal = (props: IModalProperties) => {
  const { withoutHeader = false, classNames } = props;

  return (
    <MantineModal
      {...props}
      className={"z-[10000]"}
      centered
      classNames={{
        modal: "rounded-3xl p-0 w-[40rem] aspect-video",
        header: `border-b  border-black/20 p-4 ${withoutHeader && "hidden"}`,
        close: "text-black w-8 aspect-square",
        body: "p-4 ",
        ...classNames,
      }}
    />
  );
};
