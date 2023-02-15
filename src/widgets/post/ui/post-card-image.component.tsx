import { IAction } from "@entities/action";
import { PostImage } from "@entities/post";
import { SmallUserCard } from "@entities/user";
import { Carousel } from "@mantine/carousel";
import { IAddress, useLoaderContext } from "@shared/lib";
import { useEffect, useState } from "react";

import { usePostCardContext } from "../model";

export function PostCardImage() {
  const { actions, transferType } = usePostCardContext();

  const [chosedImage, setChosedImage] = useState(0);

  const { setIsLoading } = useLoaderContext();

  useEffect(() => {
    setIsLoading(!actions);
  }, [actions]);

  if (!actions) return null;

  return (
    <div className="">
      {actions.length > 1 ? (
        <Carousel
          onSlideChange={(index) => setChosedImage(index)}
          withControls
          dragFree={false}
          classNames={{
            control: "bg-white",
          }}
          styles={{
            control: {
              backgroundColor: "rgba(0,0,0,0)",
              "&[data-inactive]": {
                opacity: 0,
                cursor: "pointer",
              },
            },
          }}
        >
          {actions.map((action, index) => {
            return (
              <Carousel.Slide key={index}>
                <PostImage
                  {...action}
                  chosedImage={chosedImage}
                  imagesCount={actions.length}
                  transferType={transferType}
                  userCard={<SmallUserCard address={action.fromAddress} />}
                />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      ) : (
        <PostImage
          {...(actions[0] as IAction)}
          transferType={transferType}
          userCard={<SmallUserCard address={actions[0]?.fromAddress as IAddress} />}
        />
      )}
    </div>
  );
}
