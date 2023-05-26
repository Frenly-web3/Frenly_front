import dynamic from "next/dynamic";
import * as React from "react";

export type IconsTypes = keyof typeof iconTypes;

const url = dynamic(() => import("/public/assets/icons/web.svg"));
const orgtelegram = dynamic(() => import("/public/assets/icons/telegram.svg"));
const cominstagram = dynamic(() => import("/public/assets/icons/instagram.svg"));
const email = dynamic(() => import("/public/assets/icons/mail.svg"));
const comtwitter = dynamic(() => import("/public/assets/icons/twitter.svg"));

 export const iconTypes = {
  url,
  orgtelegram,
  cominstagram,
  email,
  comtwitter
};

export interface ISocialIconProperties extends React.SVGAttributes<SVGElement> {
  name: IconsTypes;
}

export const SocialIcon = ({ name, ...props }: ISocialIconProperties) => {
  const Icon = iconTypes[name] ? iconTypes[name] : () => <></>;
  return <Icon {...props} />;
};
