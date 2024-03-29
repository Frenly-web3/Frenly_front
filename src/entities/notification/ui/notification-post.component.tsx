import { IAction } from "@entities/action";
import { TransferTypeEnum } from "@shared/lib";
import { UnificationImage } from "@shared/ui";
import * as React from "react";
import {
  NOTIFICATIONS_IMAGE_STYLES,
  useNotificationPostInfo,
} from "../../notification/lib";
import { IndicatorNotification } from "../../notification/ui/indicator-notification.component";
import Link from "next/link";
import { IPost } from "@entities/post";

export interface INotificationPostProps extends Pick<IPost, "id"> {
  actions: IAction[];
  transferType: TransferTypeEnum;
}

export function NotificationPost(props: INotificationPostProps) {
  const { transferType, actions, id } = props;

  const notificationPostInfo = useNotificationPostInfo({ transferType });

  return (
    <Link href={`/post/${id}`} className="relative">
      <div className="relative">
        <div className="grid grid-cols-3 relative w-16 aspect-video">
          {actions?.length > 1 && (
            <div
              className={`rounded-lg w-10 aspect-square bg-[#F2F2F2] text-[#848484] font-semibold font-rounded text-base flex justify-center items-center absolute ${NOTIFICATIONS_IMAGE_STYLES[0]}`}
            >
              {actions?.length}
            </div>
          )}
          {actions?.slice(0, 2).map((action, index) => {
            return (
              <UnificationImage
                className={`rounded-lg w-10 aspect-square absolute overflow-hidden ${
                  NOTIFICATIONS_IMAGE_STYLES[
                    actions?.length == 1 || actions?.length == 2
                      ? index
                      : index + 1
                  ]
                }`}
                {...action}
              />
            );
          })}
        </div>
        <IndicatorNotification
          {...notificationPostInfo}
          className="absolute w-3 aspect-square px-2 -top-0 -right-2 z-50"
        />
      </div>
    </Link>
  );
}
