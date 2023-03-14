import { useState, useEffect, useCallback, useMemo } from "react";

export const useConnectPush = () => {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const [subscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState();
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
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
      // window.workbox !== undefined
    ) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  const connectPush = useCallback(async () => {
    if (registration) {
      try {
        const subscriptionS = await registration?.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(
            process.env.NEXT_PUBLIC_PUBLIC_SUBSCRIBE_KEY as string
          ),
        });

        await fetch("/api/notifications", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            subscription: subscriptionS,
          }),
        });
      } catch (err: any) {
        setError(err.message);
      }
    }
  }, [registration]);

  return useMemo(
    () => ({ connectPush, subscribed, error }),
    [connectPush, subscribed, error]
  );
};
