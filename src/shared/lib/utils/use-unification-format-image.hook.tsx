import { useMemo } from 'react'

export const useUnificationFormatImage = ({
  image,
}: {
  image: { url: string; type: string }
}) => {
  return useMemo(() => {
    if (!image) {
      return
    }
    if (image.url == '') {
      return
    }
    if (image.url.slice(-3) == 'png') {
      return {
        type: 'image',
        url: image.url.replace('.png', ''),
      }
    }
    if (image.url.slice(-4) == 'jpeg') {
      return {
        type: 'image',
        url: image.url.replace('.jpeg', ''),
      }
    }
    if (image.url.slice(-3) == 'gif') {
      return {
        type: 'image',
        url: image.url.replace('.gif', ''),
      }
    }
    if (image.url.slice(-3) == 'xml') {
      return {
        type: 'image',
        url: image.url.replace('.svg+xml', ''),
      }
    }
    if (image.url.slice(-3) == 'mp4') {
      return {
        type: 'video',
        url: image.url.replace('.mp4', ''),
      }
    }
    if (image.url.slice(-4) == 'webm') {
      return {
        type: 'video',
        url: image.url.replace('.webm', ''),
      }
    }

    if (image.url.slice(-9) == 'undefined') {
      return
    }

    if (image.url.slice(-4) == 'null') {
      return
    }

    if (image.url.slice(0, 34) == 'https://gateway.pinata.cloud/ipfs/') {
      return {
        type: 'video',
        url: `https://ipfs.io/ipfs/${image.url.slice(34)}`,
      }
    }

    if (image.url == 'https://gm.frenly.cc/rest/token-images/') {
      return
    }

    if (image.url.slice(0, 7) == 'ipfs://') {
      return {
        type: 'video',
        url: `https://ipfs.io/ipfs/${image.url.slice(7)}`,
      }
    }

    if (image.url.slice(0, 5) == 'ar://') {
      return {
        type: 'video',
        url: `https://arweave.net/${image.url.slice(5)}`,
      }
    }
    return {
      type: 'image',
      url: image.url,
    }
  }, [image])
}
