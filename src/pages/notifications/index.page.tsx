import { notificationsApi } from "@shared/api";
import { useChangeAddress } from "@widgets/change-address";
import { Layout } from "@widgets/layout";
import { NotificationCardList } from "@widgets/notification-card";
import * as React from "react";

export default function Notifications() {
  useChangeAddress();

  const [readNotification] = notificationsApi.useReadNotificationsMutation();

  React.useEffect(() => {
    (async () => {
      await readNotification();
    })();
  }, []);

  return (
    <Layout title="notifications">
      <section className="w-full rounded-t-[2rem] p-4 bg-white  h-full max-md:h-screen">
        <NotificationCardList />
      </section>
    </Layout>
  );
}
