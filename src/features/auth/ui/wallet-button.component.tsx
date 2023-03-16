import { clsx } from "@mantine/core";
import * as React from "react";

export interface IWalletButtonProps {
  onClick?: () => void;
  imageRight: string;
  content: string;
  classNames?: {
    root?: string;
    image?: string;
    content?: string;
  };
}

export function WalletButton(props: IWalletButtonProps) {
  const { onClick, imageRight, content, classNames } = props;

  return (
    <button
      className={clsx(
        "bg-black rounded-3xl flex-1 flex px-1 py-1 items-center text-center text-white font-rounded font-bold",
        classNames?.root ?? ""
      )}
      onClick={onClick}
    >
      <img
        className={clsx(
          "w-10 aspect-square items-start rounded-full mr-4",
          classNames?.image ?? ""
        )}
        src={imageRight}
      />
      <span
        className={clsx(
          "text-white font-rounded font-bold",
          classNames?.content ?? ""
        )}
      >
        {content}
      </span>
    </button>
  );
}
