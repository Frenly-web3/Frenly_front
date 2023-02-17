import { revertInitialState, setAuth, setTokens } from "@entities/user";
import { authApi } from "@shared/api";
import type { Connector, IAddress } from "@shared/lib";
import { isWhitelisted, useAppDispatch } from "@shared/lib";
import { useRouter } from "next/router";
import React from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";

export function useAuth() {
  const { address } = useAccount();
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

  const login = React.useCallback(
    async (connector: Connector) => {
      console.log(connectors[connector]);

      setIsLoading(true);
      if (address && !isWhitelisted(address)) {
        router.push("/user-not-whitelisted");
        return;
      }

      try {
        const account =
          // eslint-disable-next-line unicorn/no-await-expression-member
          address || (await connectAsync({ connector: connectors[connector] })).account;

        const { data: nonce } = await getNonce({ address: account });

        if (nonce) {
          const signature = await signMessageAsync({
            message: `Nonce: ${nonce.nonce}`,
          });

          const loginResponse = await loginMutation({
            address: account as IAddress,
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
        setIsError(error.message);
      }
    },
    [
      address,
      connectAsync,
      connectors,
      getNonce,
      loginMutation,
      router,
      setAuthDispatch,
      setTokensDispatch,
      signMessageAsync,
    ]
  );

  const logout = React.useCallback(() => {
    deleteTokensDispatch();
  }, [deleteTokensDispatch]);

  return { login, logout, isLoading, isError };
}
