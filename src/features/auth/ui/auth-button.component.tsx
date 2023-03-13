import { Connector } from "@shared/lib";
import Link from "next/link";

import { useAuth } from "../model";

interface IAuthButtonProperties {}

export const AuthButton = (props: IAuthButtonProperties) => {
  const {} = props;

  const { login } = useAuth();

  return (
    <div className="w-full rounded-[2.5rem] bg-white p-4 pt-8 flex flex-col justify-center">
      <h3 className="font-rounded font-bold text-[2rem] mx-auto mb-4">
        your wallet = your profile
      </h3>
      <p className="font-normal text-black/80 mb-8 text-center">
        on frenly (and on web3 in general) ur wallet is ur profile, so for using
        frenly you need to connect the ethereum wallet
      </p>
      <div className="flex gap-5 max-md:gap-2 max-md:flex-col">
        <button
          className="bg-black rounded-3xl flex px-1 py-1 items-center flex-1"
          onClick={() => login(Connector.metamask)}
        >
          <img
            className="w-10 aspect-square items-start rounded-full"
            src="/assets/icons/metamask.svg"
          />
          <span className="text-white font-rounded font-bold m-auto">
            metamask
          </span>
        </button>
        <button
          className="bg-black rounded-3xl flex-1 flex px-1 py-1 items-center text-center text-white font-rounded font-bold"
          onClick={() => login(Connector.walletconnect)}
        >
          <img
            className="w-10 aspect-square items-start rounded-full"
            src="/assets/icons/walletconnect.svg"
          />
          <span className="text-white font-rounded font-bold m-auto">
            walletconnect
          </span>
        </button>
      </div>
      <Link
        className="bg-black/10 text-black mt-4 rounded-full text-center font-rounded font-medium text-2xl py-2"
        href={"/user-not-whitelisted"}
      >
        join waitlist
      </Link>
    </div>
  );
};
