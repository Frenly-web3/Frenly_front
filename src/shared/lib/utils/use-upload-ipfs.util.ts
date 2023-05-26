import { useCallback, useState } from "react";
import { NFTStorage } from "nft.storage";

export const useUploadIpfs = () => {
  const [isLoading, setIsLoading] = useState(false);

  const upload = useCallback(async (file: File) => {
    setIsLoading(true);

    const client = new NFTStorage({
      token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY as string,
    });

    const cid = await client.storeBlob(file);

    setIsLoading(false);

    return `https://ipfs.io/ipfs/${cid}`;
  }, []);

  return { upload, isLoading };
};
