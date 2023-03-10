import { useChangeAddress } from "@widgets/change-address";
import { Layout } from "@widgets/layout";
// import { useEffect, useLayoutEffect, useState } from "react";

import { InfinitePosts } from "./infinite-posts.component";
import { RightSection } from "./right-section.component";

export default function FeedPage() {
  useChangeAddress();
  // const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  // const [subscription, setSubscription] = useState<PushSubscription>();
  // useEffect(() => {
  // if ("serviceWorker" in navigator) {
  // run only in browser
  // }
  // }, []);
  // useLayoutEffect(() => {
  //   const requestPerm = async () => {
  //     await Notification.requestPermission();
  //     const base64ToUint8Array = (base64: string) => {
  //       const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  //       const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  //       const rawData = window.atob(b64);
  //       const outputArray = new Uint8Array(rawData.length);

  //       for (let i = 0; i < rawData.length; ++i) {
  //         outputArray[i] = rawData.charCodeAt(i);
  //       }
  //       return outputArray;
  //     };
  //     if (
  //       typeof window !== "undefined"
  //       // "serviceWorker" in navigator &&
  //       // window.workbox !== undefined
  //     ) {
  //       navigator.serviceWorker.ready.then((reg) => {
  //         reg.pushManager.getSubscription().then((sub) => {
  //           console.log("PUSH MANANGER", sub);

  //           if (
  //             sub &&
  //             !(
  //               sub.expirationTime &&
  //               Date.now() > sub.expirationTime - 5 * 60 * 1000
  //             )
  //           ) {
  //             setSubscription(sub);
  //             // setIsSubscribed(true);
  //           }
  //         });
  //         setRegistration(reg);
  //       });
  //     }

  //     const subscriptionS = await registration?.pushManager.subscribe({
  //       userVisibleOnly: true,
  //       applicationServerKey: base64ToUint8Array(
  //         process.env.NEXT_PUBLIC_PUBLIC_SUBSCRIBE_KEY as string
  //       ),
  //     });
  //     console.log(subscriptionS);
  //   };

  //   requestPerm();
  // }, []);
  return (
    <Layout title="feed" rightSidebar={<RightSection />}>
      <section className="lg:max-w-[37rem] min-w-[18.5rem] md:px-4 relative">
        <InfinitePosts />
      </section>
    </Layout>
  );
}
