// import { Image } from "@mantine/core";
// import { useMediaQuery } from "@mantine/hooks";
import { clsx } from "@mantine/core";
import { ImageProviderEnum, useUnificationFormatImage } from "@shared/lib";

import * as React from "react";

export interface IUnificationImageProps {
  image: string;
  className?: string;
  fileExtension?: string | null;
  fileProvider?: ImageProviderEnum;
}

export function UnificationImage(props: IUnificationImageProps) {
  const { image, className, fileExtension, fileProvider } = props;
  // const matches = useMediaQuery("(min-width: 768px)");

  const unificationImage = useUnificationFormatImage({
    image,
    fileExtension,
    fileProvider,
  });
  

  return (
    <div className={clsx(className)}>
      {unificationImage ? (
        <div className="relative w-full h-full">
          {unificationImage.type === "image" ? (
            <img
              src={unificationImage.url}
              alt={"post_image"}
              className="m-auto w-full h-full"

              // quality={1}
            />
          ) : (
            <video
              autoPlay
              loop
              className="m-auto"
              src={unificationImage.url.toString()}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col p-10 pb-20 gap-2 items-center justify-center aspect-square w-full bg-gray">
          <img
            width={96}
            height={96}
            src={"/assets/icons/sadEyes.svg"}
            alt="Sad eyes logo"
            className="w-24 h-full "
          />
          <span className="text-sm font-normal text-white">
            Currently we don{"'"}t support this type of token :{"("}
          </span>
        </div>
      )}
    </div>
  );
}
