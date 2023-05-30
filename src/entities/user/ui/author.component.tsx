import { clsx } from "@mantine/core";
import { IUserWalletDto } from "@shared/api";
import { Avatar, Name, TimeDate } from "@shared/ui";
import Link from "next/link";
import React from "react";

interface IAuthorProperties {
  date?: string;
  postOwner: IUserWalletDto;
  withoutLink?: boolean;
  classNames?: {
    root?: string;
    avatar?: string;
    name?: string;
  };
}

const AuthorContent = (props: Omit<IAuthorProperties, "withoutLink">) => {
  const { postOwner, date, classNames } = props;
  return (
    <>
      <div className="border rounded-full border-border-color overflow-hidden">
        <Avatar
          width={10}
          className={clsx(
            `aspect-square`,
            classNames?.avatar ? classNames.avatar : "w-10 aspect-square"
          )}
          address={postOwner?.walletAddress}
          usernameType={postOwner?.ensType}
        />
      </div>

      <div className="flex flex-col">
        <figcaption>
          <Name
            className={clsx(
              `font-rounded  cursor-pointer`,
              classNames?.name ? classNames.name : "mb-[-0.25rem] font-medium"
            )}
            address={postOwner?.walletAddress}
            usernameType={postOwner?.ensType}
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
  const { classNames, postOwner, withoutLink = false } = props;

  return (
    <div
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
          href={`/profile/${postOwner?.walletAddress}`}
          className="flex gap-2"
        >
          <AuthorContent {...props} />
        </Link>
      )}
    </div>
  );
};

export default Author;
