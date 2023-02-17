import { useUnificationFormatImage } from "@shared/lib";
import * as React from "react";

export interface IUnificationImageProps {
  image: string;
}

export function UnificationImage(props: IUnificationImageProps) {
  const { image } = props;

  const unificationImage = useUnificationFormatImage({ image });

  return (
    <div>
      {unificationImage ? (
        <>
          {unificationImage.type === "image" ? (
            <img
              src={unificationImage.url.toString()}
              alt={unificationImage.url.toString()}
              className="m-auto"
            />
          ) : (
            <video src={unificationImage.url.toString()} />
          )}
        </>
      ) : (
        <div className="flex flex-col p-10 pb-20 gap-2 items-center justify-center aspect-square w-full bg-gray">
          <img
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
