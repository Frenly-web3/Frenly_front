"use strict";

self.addEventListener("push", async function (event) {
  const data = JSON.parse(event.data.text());

  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: "./icon-512x512.png",
      data: event.data.text(),
    })
  );
});

self.addEventListener("notificationclick", function (event) {
  // const data = JSON.parse(event.data.text());
  // console.log(event.data);
  var promise = Promise.resolve();
  event.waitUntil(
    promise.then(() => {
      const data = JSON.parse(event.notification.data);
      clients.openWindow(
        `https://frenly-front-git-add-ens-mentions-frenly.vercel.app/${
          data.actionType !== 2 ? "post" : "profile"
        }/${data.openIdentifier}`
      );
    })
  );
  event.notification.close();
});

// self.addEventListener('pushsubscriptionchange', function(event) {
//   event.waitUntil(
//       Promise.all([
//           Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
//           Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration))
//               .then(function(sub) { return saveSubscription(sub) })
//       ])
//   )
// })
