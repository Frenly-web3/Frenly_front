import { TransferTypeEnum } from "@shared/lib";
import { useMemo } from "react";
import { TNotificationIcons } from "../notification-icon.types";

export interface IuseNotificationPostInfoResult {
  icon: TNotificationIcons;
  content: string;
  color: string;
}

export const useNotificationPostInfo = ({
  transferType,
}: {
  transferType: TransferTypeEnum;
}): IuseNotificationPostInfoResult => {
  return useMemo(() => {
    switch (transferType) {
      case TransferTypeEnum.MINT: {
        return {
          icon: "diamond",
          content: "",
          color: "bg-[#13DDD1]",
        };
      }
      case TransferTypeEnum.RECEIVE: {
        return {
          icon: "reply",
          content: "",
          color: "bg-[#26D962]",
        };
      }
      case TransferTypeEnum.SEND: {
        return {
          icon: "forward",
          content: "",
          color: "bg-[#cccccc]",
        };
      }
      case TransferTypeEnum.BURN: {
        return {
          icon: "mode_heat",
          content: "",
          color: "bg-[#FF4949]",
        };
      }
      case TransferTypeEnum.BOUGHT: {
        return {
          icon: "reply",
          content: "",
          color: "bg-[#26D962]",
        };
      }
      case TransferTypeEnum.SOLD: {
        return {
          icon: "forward",
          content: "",
          color: "bg-[#cccccc]",
        };
      }
      default: {
        return {
          icon: "",
          content: "",
          color: "",
        };
      }
    }
  }, [transferType]);
};
