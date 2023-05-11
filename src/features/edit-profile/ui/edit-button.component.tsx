import { Loader, clsx } from "@mantine/core";
import * as React from "react";

export interface IEditButtonProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className: string;
  isLoading: boolean;
}

export function EditButton(props: IEditButtonProps) {
  const { onChange, className, isLoading } = props;

  return (
    <label
      htmlFor="edit"
      className={clsx(
        "rounded-full md:bg-white cursor-pointer flex items-center justify-center w-[70px]  max-md:w-full max-md:h-full",
        {
          "px-3 py-2": !isLoading,
        },
        className
      )}
    >
      {/* <div className=""> */}
      {isLoading && <Loader className="w-4" />}
      {!isLoading && (
        <div className="flex items-center gap-1 max-md:invisible">
          <span className="font-icon text-black/40">edit</span>
          <span className="font-rounded text-black/80 ">edit</span>
        </div>
      )}

      {/* </div> */}
      <input onChange={onChange} type="file" id="edit" name="edit" hidden />
    </label>
  );
}
