import { Author } from "@entities/user";
import { useGetAddressFrom } from "@features/search-user/model";
import { Autocomplete } from "@mantine/core";
import { IAddress } from "@shared/lib";

import React, { useEffect, useState } from "react";
export interface IPostCommentInputProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

export function PostCommentInput(props: IPostCommentInputProps) {
  const { comment, setComment } = props;

  const [autocompleteUsername, setAutocompleteUsername] = useState("");
  const [startedUsernameIndex, setStartedUsernameIndex] = useState<
    number | null
  >(null);

  const { usernames } = useGetAddressFrom({ value: autocompleteUsername });

  useEffect(() => {
    if (comment.at(-1) === "@") {
      console.log(comment);

      setStartedUsernameIndex(comment.length);
    }

    console.log(startedUsernameIndex);

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
      unstyled
      dropdownPosition="top"
      itemComponent={(item) => {
        return (
          <button
            onKeyDown={(e) => {
              console.log(e);
            }}
            onClick={(e) => {
              setComment((prev) => {
                return (
                  prev.slice(0, prev.length - autocompleteUsername.length) +
                  item.value
                );
              });
              setStartedUsernameIndex(null);
              setAutocompleteUsername("");
            }}
          >
            <Author
              withoutLink
              classNames={{ avatar: "w-7", root: "my-1" }}
              address={item.address as IAddress}
            />
          </button>
        );
      }}
      filter={() => true}
      withinPortal
      className="w-full"
      transition="slide-up"
      transitionDuration={300}
      transitionTimingFunction="ease"
      classNames={{
        dropdown: "absolute rounded-xl bg-overlay-1-solid p-1",
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
