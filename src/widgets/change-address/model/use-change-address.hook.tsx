import { useAuth } from "@features/auth";
import { useIsWhitelisted } from "@shared/lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Connector, useAccount, useConnect } from "wagmi";

export const useChangeAddress = () => {
  const { address, connector } = useAccount();
  const isWhitelisted = useIsWhitelisted();
  const { connect, connectors } = useConnect();

  const [previousAddress, setPreviousAddress] = useState(address);

  const router = useRouter();

  const { connect: authConnect, verify } = useAuth();
  useEffect(() => {
    if (!address) {
      connect({
        connector: connectors[0] as any,
      });
      return;
    }
  }, [address]);

  useEffect(() => {
    if (
      address &&
      isWhitelisted(address) !== undefined &&
      !isWhitelisted(address)
    ) {

      router.push("/user-not-whitelisted");
      return;
    }

    if (address && previousAddress !== address) {
      setPreviousAddress(address);
      (async () => {
        //@ts-ignore
        await authConnect(connector as Connector<any, any, any>);
        await verify();
      })();
    }
  }, [address, isWhitelisted]);
};
