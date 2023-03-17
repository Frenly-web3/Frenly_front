import { AuthSteps } from "./auth-steps.component";

interface IAuthButtonProperties {}

export const AuthButton = (props: IAuthButtonProperties) => {
  const {} = props;

  return (
    <div className="md:w-3/4 rounded-[2.5rem] bg-white p-4 pt-8 flex flex-col justify-center max-w-[24.25rem]">
      <h2 className="font-rounded text-center font-bold text-[2rem] mb-4">
        welcome, fren!
      </h2>
      <h3 className="font-rounded font-bold text-xl max-md:text-2xl mx-auto mb-4 text-center">
        your wallet = your profile
      </h3>
      <p className="font-normal text-black/80 mb-8 text-center max-md:text-sm">
        on frenly (and on web3 in general) ur wallet is ur profile, so for using
        frenly you need to connect the ethereum wallet
      </p>

      <AuthSteps />
    </div>
  );
};
