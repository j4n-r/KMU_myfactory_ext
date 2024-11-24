import "./background/login.js";
const MYFACTORY_ORIGIN = "https://myfactory.privatecloud.mobi/";
// background.js

// A routing map for URLs and their corresponding actions/side panels
const routes = [
  {
    pattern:
      "https://myfactory.privatecloud.mobi/HWR/ie50/system/workplace50/workplacemain.aspx?ClientID=",
    sidePanel: "./sidepanels/homepage.html",
    action: () => {
      console.log("homepage");
      // Add custom logic here
    },
  },
  {
    pattern: "https://myfactory.privatecloud.mobi",
    sidePanel: "sidePanelB.html",
    action: () => {
      console.log("Performing action for myfactory.privatecloud.mobi");
      // Add custom logic here
    },
  },
  {
    pattern: "*", // Catch-all route
    sidePanel: "./sidepanel/login.html",
    action: () => {
      document.getElementById("login").addEventListener("click", () => {
        console.log("createt ab");
        chrome.tabs.create({
          url: "https://myfactory.privatecloud.mobi/HWR/ie50/system/login/sysloginbackground.aspx?login=start&apptype=-3.url",
        });
      });
    },
  },
];

// Function to match a URL to a route
function matchRoute(url) {
  for (const route of routes) {
    if (route.pattern === "*" || url.startsWith(route.pattern)) {
      return route;
    }
  }
  return null;
}

// Function to handle routing logic
async function handleRouting(tab) {
  const url = tab.url || "";

  // Match the current URL to a route
  const matchedRoute = matchRoute(url);

  if (matchedRoute) {
    // Perform the route-specific action
    matchedRoute.action();

    // Change the side panel dynamically
    await chrome.sidePanel.open({ path: matchedRoute.sidePanel });
  }
}
// Listen for URL changes in the active tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleRouting(tab);
  }
});

// Listen for tab URL updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === currentTabId && changeInfo.url) {
    // If the tab is the current one being monitored and the URL changes
    openSidePanelForTab(tab);
  }
});

// Function to open the side panel based on the current tab's URL
async function openSidePanelForTab(tab) {
  const targetUrl = MYFACTORY_ORIGIN;
  const isTargetUrl = tab.url === targetUrl;

  // Dynamically open the correct side panel
  await chrome.sidePanel.open({
    path: isTargetUrl ? "sidePanelA.html" : "sidePanelB.html",
  });
}
