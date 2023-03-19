import { Popover as MantinePopover, PopoverProps } from "@mantine/core";
import * as React from "react";

export interface IPopoverProps extends PopoverProps {
  children: React.ReactNode;
  content: string;
  opened: boolean;
  setOpened: (value: boolean) => void;
}

export function Popover(props: IPopoverProps) {
  const { children, content, opened, setOpened } = props;

  return (
    <MantinePopover
      position="right"
      withArrow
      shadow="md"
      opened={opened}
      onChange={setOpened}
    >
      <MantinePopover.Target>{children}</MantinePopover.Target>
      <MantinePopover.Dropdown className="font-rounded bg-background text-black font-semibold">
        {content}
      </MantinePopover.Dropdown>
    </MantinePopover>
  );
}
