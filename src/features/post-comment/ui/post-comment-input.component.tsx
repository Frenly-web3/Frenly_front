import { Author } from "@entities/user";
import { useGetAddressFrom } from "@features/search-user/model";
import { Autocomplete } from "@mantine/core";
import { IAddress } from "@shared/lib";

import React, { useEffect, useState } from "react";
export interface IPostCommentInputProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  setMentionAddresses: React.Dispatch<
    React.SetStateAction<{
      [key: string]: IAddress;
    }>
  >;
}

export function PostCommentInput(props: IPostCommentInputProps) {
  const { comment, setComment, sendMessage, setMentionAddresses } = props;

  const [autocompleteUsername, setAutocompleteUsername] = useState("");
  const [startedUsernameIndex, setStartedUsernameIndex] = useState<
    number | null
  >(null);

  const { usernames } = useGetAddressFrom({ value: autocompleteUsername });

  useEffect(() => {
    if (comment.at(-1) === "@") {
      setStartedUsernameIndex(comment.length);
    }

    if (
      comment.slice(-3) === "eth" ||
      comment === "" ||
      comment.at(-1) === " "
    ) {
      setStartedUsernameIndex(null);
    }
  }, [comment, startedUsernameIndex]);

  useEffect(() => {
    if (!startedUsernameIndex) return;
    setAutocompleteUsername(comment.slice(startedUsernameIndex));
  }, [comment, startedUsernameIndex]);

  const itemClickHandle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    item: any
  ) => {
    setComment((prev) => {
      return (
        prev.slice(0, prev.length - autocompleteUsername.length) +
        item.value +
        " "
      );
    });
    setMentionAddresses((prev) => ({
      ...prev,
      [item.value]: item.address,
    }));
    setStartedUsernameIndex(null);
    setAutocompleteUsername("");
  };

  return (
    <Autocomplete
      data={
        startedUsernameIndex
          ? usernames?.map((username) => ({
              value: username.name,
              address: username.address,
            })) ?? []
          : []
      }
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
      unstyled
      dropdownPosition="top"
      itemComponent={(item) => {
        return (
          <button onClick={(e) => itemClickHandle(e, item)}>
            <Author
              withoutLink
              classNames={{ avatar: "w-7", root: "my-1" }}
              postOwner={{ walletAddress: item.address as IAddress, ensType: 0 }}
            />
          </button>
        );
      }}
      filter={() => true}
      // withinPortal
      className="w-full z-50"
      initiallyOpened
      transition="slide-up"
      transitionDuration={300}
      transitionTimingFunction="ease"
      classNames={{
        dropdown: "absolute rounded-xl bg-overlay-1-solid p-1 z-[9999]",
        itemsWrapper: "rounded-3xl",
        input:
          "flex-1 bg-overlay-1-solid py-2 px-4 leading-4 rounded-[1rem] w-full font-rounded",
      }}
      type="text"
      placeholder="nice comment..."
      value={comment}
      onChange={(e) => setComment(e)}
    />
  );
}
