(()=>{"use strict";self.addEventListener("push",(async function(t){const n=JSON.parse(t.data.text());t.waitUntil(registration.showNotification(n.title,{body:n.message,icon:"./icon-512x512.png",data:t.data.text()}))})),self.addEventListener("notificationclick",(function(t){var n=Promise.resolve();t.waitUntil(n.then((()=>{const n=JSON.parse(t.notification.data);clients.openWindow(`https://frenly-front-git-add-ens-mentions-frenly.vercel.app/${2!==n.actionType?"post":"profile"}/${n.openIdentifier}`)}))),t.notification.close()}))})();