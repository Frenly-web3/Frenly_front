import { clsx } from "@mantine/core";
import type { IAddress } from "@shared/lib";
// eslint-disable-next-line import/no-cycle
import { TimeDate } from "@shared/ui";
import Link from "next/link";
import React from "react";

import { Avatar } from "./avatar.component";
import { Name } from "./name.component";

interface IAuthorProperties {
  date?: string;
  address: IAddress;
  classNames?: {
    root?: string;
    avatar?: string;
    name?: string;
  };
}

export const Author = (props: IAuthorProperties) => {
  const { address, date, classNames } = props;

  return (
    <figure
      className={clsx(
        "flex gap-2",
        classNames?.root ? classNames.root : "items-center"
      )}
    >
      <Link
        href={`/profile/${address}`}
        className="flex items-center border rounded-full border-border-color overflow-hidden"
      >
        <Avatar
          className={clsx(
            `aspect-square`,
            classNames?.avatar ? classNames.avatar : "w-10"
          )}
          address={address}
        />
      </Link>
      <div className="flex flex-col">
        <figcaption>
          <Name
            className={clsx(
              `font-rounded  cursor-pointer`,
              classNames?.name ? classNames.name : "mb-[-0.25rem] font-medium"
            )}
            address={address}
          />
        </figcaption>
        {date && (
          <div className="font-text text-hidden font-regular text-sm">
            <TimeDate date={date} />
          </div>
        )}
      </div>
    </figure>
  );
};

export default Author;
