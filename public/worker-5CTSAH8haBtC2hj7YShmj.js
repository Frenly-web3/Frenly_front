(()=>{"use strict";self.addEventListener("push",(function(t){const i=JSON.parse(t.data.text());console.log(JSON.stringify(i)),t.waitUntil(registration.showNotification(i.title,{body:JSON.stringify(i),icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png"}))})),self.addEventListener("notificationclick",(function(t){t.notification.close(),t.waitUntil(clients.matchAll({type:"window",includeUncontrolled:!0}).then((function(t){if(t.length>0){let i=t[0];for(let n=0;n<t.length;n++)t[n].focused&&(i=t[n]);return i.focus()}return clients.openWindow("https://localhost:3000/notifications")})))}))})();