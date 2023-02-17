import { useMemo } from 'react'

export const useUnificationFormatImage = ({
  image,
}: {
  image: string
}) => {
  return useMemo(() => {
    if (!image) {
      return
    }
    if (image == '') {
      return
    }
    if (image.slice(-3) == 'png') {
      return {
        type: 'image',
        url: image.replace('.png', ''),
      }
    }
    if (image.slice(-4) == 'jpeg') {
      return {
        type: 'image',
        url: image.replace('.jpeg', ''),
      }
    }
    if (image.slice(-3) == 'gif') {
      return {
        type: 'image',
        url: image.replace('.gif', ''),
      }
    }
    if (image.slice(-5) == '.webp') {
      return {
        type: 'image',
        url: image.replace('.webp', ''),
      }
    }
    if (image.slice(-3) == 'xml') {
      return {
        type: 'image',
        url: image.replace('.svg+xml', ''),
      }
    }
    if (image.slice(-3) == 'mp4') {
      return {
        type: 'video',
        url: image.replace('.mp4', ''),
      }
    }
    if (image.slice(-4) == 'webm') {
      return {
        type: 'video',
        url: image.replace('.webm', ''),
      }
    }

    if (image.slice(-9) == 'undefined') {
      return
    }

    if (image.slice(-4) == 'null') {
      return
    }

    if (image.slice(0, 34) == 'https://gateway.pinata.cloud/ipfs/') {
      return {
        type: 'video',
        url: `https://ipfs.io/ipfs/${image.slice(34)}`,
      }
    }

    if (image == 'https://gm.frenly.cc/rest/token-images/') {
      return
    }

    if (image.slice(0, 7) == 'ipfs://') {
      return {
        type: 'video',
        url: `https://ipfs.io/ipfs/${image.slice(7)}`,
      }
    }

    if (image.slice(0, 5) == 'ar://') {
      return {
        type: 'video',
        url: `https://arweave.net/${image.slice(5)}`,
      }
    }
    return {
      type: 'image',
      url: image,
    }
  }, [image])
}
