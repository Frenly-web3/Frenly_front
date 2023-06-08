import { userSelector } from "@entities/user";
import { useIsWhitelisted } from "@shared/lib";
import { Button, Meta } from "@shared/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

export default function UserNotWhitelistedPage() {
  const { address } = useAccount();
  const router = useRouter();
  const isWhitelisted = useIsWhitelisted();
  const user = useSelector(userSelector);
  if (address && isWhitelisted(address) && user.isAuth) router.push("/feed");

  return (
    <>
      <Meta title="Frenly" description="Not whitelisted" />
      <div className="container flex flex-col items-center h-screen">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src="/assets/images/eyes.gif" alt="eyes" className="w-20 h-20" />
          <h1 className="text-4xl font-bold mt-16">Frenly</h1>
          <h2 className="text-base text-center mt-3 text-gray">
            Woops, your address in not whitelisted for alpha test. Gain access
            to the closed alpha filling the form below.
          </h2>
        </div>

        <div className="w-full py-4 mb-16">
          <Link
            href="https://form.waitlistpanda.com/go/4C0JLtlQcH3sBqb0wCbx"
            className="w-full"
          >
            <Button>Open Form</Button>
          </Link>
          <div className="mt-2"></div>
          <Link href={"/"}>
            <Button>Back to Auth</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
