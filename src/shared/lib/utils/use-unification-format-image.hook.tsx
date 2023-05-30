import { useMemo } from "react";
import { ImageProviderEnum } from "../enums";

const isVideo = (imageUrl: string, fileExtension: string) =>
  /video/.test(fileExtension as string) ||
  /mp4/.test(fileExtension as string) ||
  /mp4/.test(fileExtension as string) ||
  /video/.test(imageUrl as string) ||
  /mp4/.test(imageUrl as string) ||
  /mp4/.test(imageUrl as string);

export const useUnificationFormatImage = ({
  image,
  fileExtension,
  fileProvider,
}: {
  image: string;
  fileExtension?: string | null;
  fileProvider?: ImageProviderEnum;
}) => {
  return useMemo(() => {
    if (image === "avatar_placeholder")
      return { url: "/assets/images/default-avatar.png", type: "image" };
    if (!image) return null;
    switch (fileProvider) {
      case ImageProviderEnum.ALCHEMY:
        if (fileExtension === null) {
          return getLinkWithoutExt(image);
        } else {
          if (fileExtension === "mp4" || fileExtension === "webm" || isVideo(image, fileExtension as string)) {
            return {
              type: "video",
              url: image,
            };
          } else {
            return { type: "image", url: image };
          }
        }
      case ImageProviderEnum.OPENSEA:
        return getLinkWithoutExt(image);
      case ImageProviderEnum.RARIBLE:
        if (isVideo(image as string, fileExtension as string)) {
          return {
            type: "video",
            url: image,
          };
        } else {
          return { type: "image", url: image };
        }

      default:
        if (isVideo(image, fileExtension as string)) {
          return { type: "video", url: image };
        } else {
          return { type: "image", url: image };
        }
    }
  }, [image]);
};

const getLinkWithoutExt = (image: string) => {
  if (image.slice(-3) == "png") {
    return {
      type: "image",
      url: image.replace(".png", ""),
    };
  }
  if (image.slice(-4) == "jpeg") {
    return {
      type: "image",
      url: image.replace(".jpeg", ""),
    };
  }
  if (image.slice(-3) == "gif") {
    return {
      type: "image",
      url: image.replace(".gif", ""),
    };
  }
  if (image.slice(-5) == ".webp") {
    return {
      type: "image",
      url: image.replace(".webp", ""),
    };
  }
  if (image.slice(-3) == "xml") {
    return {
      type: "image",
      url: image.replace(".svg+xml", ""),
    };
  }
  if (image.slice(-3) == "mp4") {
    return {
      type: "video",
      url: image.replace(".mp4", ""),
    };
  }
  if (image.slice(-4) == "webm") {
    return {
      type: "video",
      url: image.replace(".webm", ""),
    };
  }

  if (
    /video/.test(image as string) ||
    /mp4/.test(image as string) ||
    /webm/.test(image as string)
  ) {
    return { type: "video", url: image };
  } else {
    return { type: "image", url: image };
  }
};
