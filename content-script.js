// contentScript.js

// listen for when content is fully loaded
function cacheElements() {
    const elements = [...document.querySelectorAll('textarea, [contenteditable="true"]')];
    const summaries = elements.map(elem => ({
      type: elem.tagName.toLowerCase(),
      summary: elem.innerText.replace(/\n/g, ' ').split(' ').slice(0, 15).join(' '), // First 15 words
      full: elem.innerText,
    }));

    chrome.runtime.sendMessage({ type: "triggerCacheUpdate", data: summaries });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "cacheElements") {
        cacheElements();
    }
  });
  
  // Initial cache
setTimeout(() => {
    cacheElements();
    chrome.runtime.sendMessage({ message: "contentScriptReady" });
}, 500);
console.log('contentScript.js loaded');