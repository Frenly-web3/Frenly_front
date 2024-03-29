import { IAddress, useGetFrenProfile } from "@shared/lib";
import { useMemo } from "react";

export interface IuseGetFrenLinks {
  address: IAddress;
  skip?: boolean;
}

export const useGetFrenInfo = ({ address, skip = false }: IuseGetFrenLinks) => {
  const { data } = useGetFrenProfile({ address, skip });

  return useMemo(() => {
    return {
      description: data?.description,
      socials: data?.twitterLink ? [["com.twitter", data?.twitterLink]] : [],
    };
  }, [address, data]);
};
