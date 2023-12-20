// background.js

const cacheElements = {};
const insights = {count: 0};
let contentScriptReady = {};

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.message === "contentScriptReady") {
    contentScriptReady[sender.tab?.id] = true;
  }
});

//let editableAreaCache = [];
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "triggerCacheUpdate") {
    if (!message?.data?.length)  return;
    cacheElements[sender.tab?.id] = message.data;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "requestSummaryData") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id) {
        sendResponse({cacheElements: cacheElements[activeTab.id] ?? [], insights});
      }
  });
  }

  return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "clearBadge") {
    chrome.action.setBadgeText({ text: "" });
    insights.count == 0;
  }
});

// listen for tab changes
chrome.tabs.onActivated.addListener(({tabId, windowId}) => {
  if (!contentScriptReady[tabId]) return;

  chrome.tabs.sendMessage(tabId, { type: "cacheElements" });
});

//Send a notification to the user when requestNotification is received
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  if (message.type === "requestNotification") {
    setTimeout(() => {
      insights.count++;
      chrome.action.setBadgeText({ text: "1" });
    chrome.action.setBadgeBackgroundColor({ color: "#00B3DC" });
    chrome.notifications.create(null, {
      type: "basic",
      iconUrl: "icon32.png",
      title: "Notification from Bigfoot",
      message: `Hurray! Your "${message.content}" note has resulted in fresh insights.!`,
    });
    }, 5000);
  }
});