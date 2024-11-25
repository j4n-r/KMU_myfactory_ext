import "./sidepanels/login.js";
const ORIGIN = "https://myfactory.privatecloud.mobi/";
const LOGIN =
  "https://myfactory.privatecloud.mobi/HWR/ie50/system/login/sysloginbackground.aspx?login=start&apptype=-3";

const routes = {
  login: {
    url: "*",
    path: "./sidepanels/login.html",
    action() {
      login();
      console.log("trigger");
    },
  },
  dashboard: {
    url: ORIGIN,
    path: "./sidepanels/dashboard.html",
    action() {},
  },
};
let routeslist = Object.values(routes);

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({ path: routes.dashboard });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  for (const route of routeslist) {
    if (tab.url.startsWith(route.url)) {
      await chrome.sidePanel.setOptions({
        path: routes.dashboard.path,
        enabled: true,
      });
      route.action();
    }
  }
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  for (const route of routeslist) {
    if (tab.url.startsWith(route.url)) {
      await chrome.sidePanel.setOptions({
        path: routes.dashboard.path,
        enabled: true,
      });
      route.action();
    }
  }
});
