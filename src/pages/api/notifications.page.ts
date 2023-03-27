const webPush = require("web-push");
import type { NextApiRequest, NextApiResponse } from "next";
// const vapidKeys = webPush.generateVAPIDKeys();
// console.log(vapidKeys);
webPush.setVapidDetails(
  `mailto: ${process.env.NEXT_PUBLIC_EMAIL_SUBSCRIBE}`,
  process.env.NEXT_PUBLIC_PUBLIC_SUBSCRIBE_KEY,
  process.env.NEXT_PUBLIC_PRIVATE_SUBSCRIBE_KEY
);

export default function notifications(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { subscription } = req.body;
    // const vapidKeys = webPush.generateVAPIDKeys();

    webPush
      .sendNotification(
        subscription,
        JSON.stringify({
          title: "Hello Web Push",
          message: "Your web push notification is here!",
          icon: 'src/app/worker/icon-512x512.png'
        })
      )
      .then((response: any) => {

        res.writeHead(response.statusCode, response.headers).end(response.body);
      })
      .catch((err: any) => {


        if ("statusCode" in err) {
          res.writeHead(err.statusCode, err.headers).end(err.body);
        } else {
          console.error(err);
          res.statusCode = 500;
          res.end();
        }
      });
  } else {
    res.statusCode = 405;
    res.end();
  }
}
