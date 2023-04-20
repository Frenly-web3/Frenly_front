import { userSelector } from "@entities/user";
import { AuthButton } from "@features/auth";
import { isWhitelisted } from "@shared/lib";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
// const webPush = require("web-push");

const Index = () => {
  const { address } = useAccount();
  const router = useRouter();

  const user = useSelector(userSelector);
  if (address && isWhitelisted(address) && user.isAuth) router.push("/feed");

  return (
    <div className="bg-background h-full">
      <div className="container flex flex-col items-center justify-center h-full max-md:py-6">
        <div className="flex flex-col items-center justify-center mb-5">
          <img
            src="/assets/icons/eyesLogo.svg"
            alt="eyes"
            className="w-32 h-32"
          />
          <span className="font-rounded font-bold text-[2rem]">
            welcome, fren!
          </span>
        </div>

        <AuthButton />
      </div>
    </div>
  );
};

export default Index;
