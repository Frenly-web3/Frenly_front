import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
export const formatFancyDate = (date: Date) => {
  dayjs.extend(relativeTime);
  //@ts-ignore
  return dayjs(date).fromNow();
};
