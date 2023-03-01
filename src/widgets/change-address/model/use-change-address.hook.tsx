import { useAuth } from "@features/auth";
import { isWhitelisted } from "@shared/lib";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Connector, useAccount, useConnect } from "wagmi";

export const useChangeAddress = () => {
  const { address, connector } = useAccount();

  const { connect, connectors } = useConnect();

  const [previousAddress, setPreviousAddress] = useState(address);

  const router = useRouter();

  const { login } = useAuth();
  useEffect(() => {
    if (!address) {
      connect({
        connector: connectors[0] as any,
      });
      return;
    }
  }, [address]);

  useEffect(() => {
    if (address && !isWhitelisted(address)) {
      router.push("/user-not-whitelisted");
      return;
    }

    if (address && previousAddress !== address) {
      setPreviousAddress(address);
      (async () => {
        //@ts-ignore
        await login(connector as Connector<any, any, any>);
      })();
    }
  }, [address]);
};
