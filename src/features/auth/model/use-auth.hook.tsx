import { revertInitialState, setAuth, setTokens } from "@entities/user";
import { authApi } from "@shared/api";
import type { Connector, IAddress } from "@shared/lib";
import { isWhitelisted, useAppDispatch } from "@shared/lib";
import { useRouter } from "next/router";
import React from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { disconnect } from "@wagmi/core";

export function useAuth() {
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const [loginMutation] = authApi.useValidateUserSignatureMutation();
  const [getNonce] = authApi.useLazyGetUserNonceQuery();
  const setAuthDispatch = useAppDispatch(setAuth);
  const setTokensDispatch = useAppDispatch(setTokens);
  const deleteTokensDispatch = useAppDispatch(revertInitialState);
  const { signMessageAsync } = useSignMessage();
  const { connectAsync, connectors } = useConnect();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState<false | string>(false);

  const connect = React.useCallback(async (connector: Connector) => {
    setIsLoading(true);

    try {
      await disconnectAsync();
      await disconnect();
      await connectAsync({ connector: connectors[connector], chainId: 1 });
    } catch (error: any) {
      setIsError(error.message);
      await disconnectAsync();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verify = React.useCallback(async () => {
    setIsLoading(true);

    if (address && !isWhitelisted(address)) {
      await disconnectAsync();
      await disconnect();
      router.push("/user-not-whitelisted");
      return;
    }

    try {
      const { data: nonce } = await getNonce({ address: address as IAddress });

      if (nonce) {
        const signature = await signMessageAsync({
          message: `Nonce: ${nonce.nonce}`,
        });

        const loginResponse = await loginMutation({
          address: address as IAddress,
          signature,
        });

        if ("data" in loginResponse) {
          const { data: tokens } = loginResponse;

          setAuthDispatch({ isAuth: true });
          setTokensDispatch({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      await disconnectAsync();
      await disconnect();
      setIsError(error.message);
    }
  }, [
    address,
    getNonce,
    loginMutation,
    setAuthDispatch,
    setTokensDispatch,
    signMessageAsync,
  ]);

  const logout = React.useCallback(async () => {
    deleteTokensDispatch();
    await disconnectAsync();
    await disconnect();
  }, [deleteTokensDispatch]);

  return { connect, logout, isLoading, isError, verify };
}
