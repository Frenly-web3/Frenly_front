import { DrawerStylesNames, ModalStylesNames } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import * as React from "react";
import { Drawer } from "../drawer";
import { Modal } from "../modal";

export interface IAdaptiveModalProps {
  opened: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  classNamesDrawer?: Partial<Record<DrawerStylesNames, string>>;
  classNamesModal?: Partial<Record<ModalStylesNames, string>>;
}

export function AdaptiveModal(props: IAdaptiveModalProps) {
  const { classNamesDrawer, classNamesModal, ...restProps } = props;
  const matches = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      {matches ? (
        <Drawer {...restProps} classNames={classNamesDrawer} />
      ) : (
        <Modal {...restProps} classNames={classNamesModal} />
      )}
    </div>
  );
}
