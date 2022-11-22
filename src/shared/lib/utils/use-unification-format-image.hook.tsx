export const useUnificationFormatImage = ({ image }: { image: string }) => {
  if (image == '') {
    return
  }
  if (image.slice(-3) == 'mp4') {
    return
  }

  if (image.slice(-9) == 'undefined') {
    return
  }

  if (image.slice(-4) == 'null') {
    return
  }

  if (image.slice(0, 34) == 'https://gateway.pinata.cloud/ipfs/') {
    return `https://ipfs.io/ipfs/${image.slice(34)}`
  }

  if (image == 'https://gm.frenly.cc/rest/token-images/') {
    return
  }

  if (image.slice(0, 7) == 'ipfs://') {
    return `https://ipfs.io/ipfs/${image.slice(7)}`
  }

  if (image.slice(0, 5) == 'ar://') {
    return `https://arweave.net/${image.slice(5)}`
  }
  return image
}
