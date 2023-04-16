import { clsx } from "@mantine/core";
import type { IAddress } from "@shared/lib";
// eslint-disable-next-line import/no-cycle
import { Avatar, Name, TimeDate } from "@shared/ui";
import Link from "next/link";
import React from "react";

interface IAuthorProperties {
  date?: string;
  address: IAddress;
  withoutLink?: boolean;
  classNames?: {
    root?: string;
    avatar?: string;
    name?: string;
  };
}

const AuthorContent = (props: Omit<IAuthorProperties, "withoutLink">) => {
  const { address, date, classNames } = props;
  return (
    <>
      <div className="border rounded-full border-border-color overflow-hidden">
        <Avatar
          width={10}
          className={clsx(
            `aspect-square`,
            classNames?.avatar ? classNames.avatar : "w-10 aspect-square"
          )}
          address={address}
        />
      </div>

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
    </>
  );
};

export const Author = (props: IAuthorProperties) => {
  const { classNames, address, withoutLink = false } = props;

  return (
    <figure
      className={clsx(
        "flex gap-2",
        classNames?.root ? classNames.root : "items-center"
      )}
    >
      {withoutLink ? (
        <AuthorContent {...props} />
      ) : (
        <Link
          passHref={true}
          href={`/profile/${address}`}
          className="flex gap-2"
        >
          <AuthorContent {...props} />
        </Link>
      )}
    </figure>
  );
};

export default Author;
