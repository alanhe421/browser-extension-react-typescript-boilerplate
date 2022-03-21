import { TabIdentifierClient } from 'chrome-tab-identifier';

console.log('content-script loaded.', chrome);
const tabIdClient = new TabIdentifierClient();

/**
 * Fired when a message is sent from either an extension process
 */
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    /**
     * Send message to web
     */
    window.postMessage(message, '*');
    return true;
  },
);

window.addEventListener('message', function (event) {
  tabIdClient.getTabId().then(tabId => {
    chrome.runtime.sendMessage({
      data: event.data,
      tabId,
    });
  });
});

function injectScript(file, node) {
  const th = document.getElementsByTagName(node)[0];
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  th.appendChild(s);
}

injectScript(chrome.runtime.getURL('sdk.js'), 'body');
