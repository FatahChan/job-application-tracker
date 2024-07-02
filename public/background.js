/* eslint-disable no-undef */
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => {
    console.error(error);
  });

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "toggle_sidepanel") {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
