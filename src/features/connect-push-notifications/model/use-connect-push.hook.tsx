import { notificationsApi } from "@shared/api";
import { useState, useEffect, useCallback } from "react";

export const useConnectPush = () => {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const [subscribed, setIsSubscribed] = useState(false);

  const [createWebPushSubscription] =
    notificationsApi.useCreateWebPushSubscriptionMutation();

  const base64ToUint8Array = useCallback((base64: string) => {
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(b64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }, []);

  useEffect(() => {
    if (subscribed) return;

    setTimeout(() => {
      if (
        typeof window !== "undefined" &&
        "serviceWorker" in navigator &&
        !subscribed
      ) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.pushManager.getSubscription().then((sub) => {
            setIsSubscribed(true);
            setRegistration(reg);
          });
        });
      }
    }, 2500);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const subscriptionInfo = await registration?.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(
            process.env.NEXT_PUBLIC_PUBLIC_SUBSCRIBE_KEY as string
          ),
        });
        await createWebPushSubscription({
          subscriptionInfo: JSON.stringify(subscriptionInfo),
        });
      } catch (err: any) {}
    })();
  }, [registration]);
};
