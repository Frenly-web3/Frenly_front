import { Loader, clsx } from "@mantine/core";
import * as React from "react";

export interface IEditButtonProps extends React.ButtonHTMLAttributes<unknown> {
  isLoading?: boolean;
  editType: "add" | "edit" | "save";
}

export function EditButton(props: IEditButtonProps) {
  const { isLoading, editType, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={clsx(
        "rounded-full md:bg-white cursor-pointer flex items-center justify-center  h-8 border-2 border-black/20 px-3 py-2"
      )}
    >
      {isLoading && <Loader className="w-4" />}
      {!isLoading && (
        <div className="flex items-center gap-1">
          <span className="font-icon text-black/40">{editType}</span>
          <span className="font-rounded text-black/80 ">{editType}</span>
        </div>
      )}
    </button>
  );
}
