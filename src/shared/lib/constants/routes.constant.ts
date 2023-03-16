export const ROUTES = [
  {
    path: "/feed/",
    name: "feed",
    icon: "home",
    isNew: false,
    unreadContent: false,
  },
  {
    path: "/search/",
    name: "search",
    icon: "search",
    isNew: false,
    unreadContent: false,
  },
  {
    path: "/feed/posers/",
    name: "posers",
    icon: "account_box",
    isNew: true,
    unreadContent: false,
  },

  {
    path: "/notifications/",
    name: "notifications",
    icon: "notifications",
    unreadContent: true,
    isNew: false,
  },
];
