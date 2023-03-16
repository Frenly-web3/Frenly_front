import * as React from "react";
import { TNotificationIcons } from "../lib";

export interface IIndicatorNotificationProps {
  icon: TNotificationIcons;
  className?: string;
  color: string;
}

export function IndicatorNotification(props: IIndicatorNotificationProps) {
  const { icon, className, color } = props;

  return (
    <div
      className={`rounded-full border-2 border-white flex items-center ${color} text-micro  justify-center ${className} font-icon aspect-square flex justify-center items-center font-semibold text-white`}
    >
      {icon}
    </div>
  );
}
