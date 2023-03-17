import { userSelector } from "@entities/user";
import { AuthButton } from "@features/auth";
import { FRENLY_SOCIAL_LINK, isWhitelisted } from "@shared/lib";
import { SocialLinkBadge } from "@shared/ui";
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
    <div className="bg-background h-full overflow-hidden">
      <div className="flex justify-between items-center md:w-[70%] max-md:w-[90%] mx-auto tall:mt-4 mt-1 max-md:items-start">
        <div className="flex items-center gap-[10px]">
          <img
            src="/assets/icons/eyesLogo.svg"
            alt="eyes"
            className="w-7 aspect-auto"
          />
          <h1 className="font-rounded font-bold text-2xl leading-tight tracking-tight">
            frenly
          </h1>
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 max-md:gap-1">
          {FRENLY_SOCIAL_LINK.map((link, index) => {
            return <SocialLinkBadge {...link} key={index} />;
          })}
        </div>
      </div>
      {/* <div className="container flex flex-col items-center justify-center max-md:py-6">
       */}
      <div className="w-full h-full flex justify-center items-center tall:items-start tall:mt-4 tall:flex-row flex-col">
        <img
          src="/assets/icons/eyesLogo.svg"
          alt="eyes"
          className="w-32 h-32 mb-4 tall:hidden"
        />
        <AuthButton />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Index;
