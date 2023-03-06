import Image from "next/image";
import * as React from "react";

export interface ITokenImageProps {
  image: string;
}

export function TokenImage(props: ITokenImageProps) {
  const { image } = props;
  const [errorImage, setErrorImage] = React.useState(false);
  const [load, setLoad] = React.useState(false);

  return (
    <>
      {!errorImage ? (
        <div
          className={`w-full aspect-square rounded-2xl overflow-hidden border-2 border-black/10 ${
            load && "bg-black/20 animate-pulse relative"
          }`}
        >
          <Image
            width={139}
            height={139}
            src={image}
            onError={() => setErrorImage(true)}
            sizes="33vw"
            quality={25}
            alt=""
            onLoadStart={() => setLoad(true)}
            onLoadingComplete={() => setLoad(false)}
            loading="lazy"
            className="w-full aspect-square"
            placeholder="blur"
            blurDataURL="/assets/icons/sadEyes.svg"
          />
        </div>
      ) : (
        <div
          className={`w-full aspect-square rounded-2xl overflow-hidden border-2 border-black/10 ${
            load && "bg-black/20 animate-pulse"
          }`}
        >
          <video src={image} className="w-full">
            <source src={image} className="w-full" />
            <img src={image} className="w-full" />
          </video>
        </div>
      )}
    </>
  );
}
