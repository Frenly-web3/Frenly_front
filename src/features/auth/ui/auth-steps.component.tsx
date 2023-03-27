import Link from "next/link";
import * as React from "react";
import { useAccount } from "wagmi";
import { WalletButton } from "./wallet-button.component";
import { Connector, IAddress, useUserAvatar, useUserName } from "@shared/lib";
import { useAuth } from "../model";
import { Button } from "@shared/ui";

export interface IAuthStepsProps {}

export function AuthSteps(props: IAuthStepsProps) {
  const { address } = useAccount();

  const [account, setAccount] = React.useState<IAddress>();

  const { data: userAvatar } = useUserAvatar({ address: address as IAddress });
  const { data: userName } = useUserName({
    address: address as IAddress,
    with0x: true,
  });

  React.useLayoutEffect(() => {
    setAccount(address);
  }, [address]);

  const { connect, verify } = useAuth();
  return (
    <div className=" border-[1px] p-4 border-black/20 rounded-[2.5rem]">
      <h5 className="text-center text-2xl font-semibold font-rounded text-black mb-6">
        <span className="text-black/40">step {account ? 2 : 1}:</span>{" "}
        {account ? "verify signature" : "connect wallet"}
      </h5>
      {!account ? (
        <div className="flex gap-2 flex-col">
          <WalletButton
            content="metamask"
            imageRight="/assets/icons/metamask.svg"
            onClick={() => connect(Connector.metamask)}
          />
          <WalletButton
            content="walletconnect"
            imageRight="/assets/icons/walletconnect.svg"
            onClick={() => connect(Connector.walletconnect)}
          />
          <Link
            className="bg-black/10 text-black mt-6 rounded-full text-center font-rounded font-medium text-2xl py-2"
            href={"/user-not-whitelisted"}
          >
            join waitlist
          </Link>
        </div>
      ) : (
        <div className="flex flex-col">
          <h4 className="text-2xl font-semibold font-rounded text-center mb-4">
            connected wallet
          </h4>
          <WalletButton
            content={userName}
            imageRight={userAvatar}
            classNames={{
              root: "!bg-black/5 !cursor-default",
              content: "!text-black",
            }}
          />
          <Button
            onClick={() => verify()}
            className="!rounded-full font-rounded text-xl !py-1 mt-9"
          >
            verify signature
          </Button>
        </div>
      )}
    </div>
  );
}
