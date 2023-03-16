import * as React from "react";

export interface ITokenImageProps {
  image: string;
}

export function TokenImage(props: ITokenImageProps) {
  const { image } = props;
  // const [errorImage, setErrorImage] = React.useState(false);
  // const [load, setLoad] = React.useState(false);

  return (
    <>
      <div
        className={`w-full aspect-square rounded-2xl overflow-hidden border-2 border-black/10 `}
      >
        <img
          width={139}
          height={139}
          src={image}
          // onError={() => setErrorImage(true)}
          alt=""
          // onLoadStart={() => setLoad(true)}
          // loading="lazy"
          className="w-full aspect-square"
        />
      </div>
    </>
  );
}
