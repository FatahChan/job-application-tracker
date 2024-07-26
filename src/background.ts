import browser from "webextension-polyfill";

console.log("Hello from the background!");

browser.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
});

// @ts-expect-error - sidePanel is not defined in browser from "webextension-polyfill" but is defined in chrome
browser.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error: unknown) => {
    console.error(error);
  });
