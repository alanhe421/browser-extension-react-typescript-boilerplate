import { TabIdentifier } from 'chrome-tab-identifier';

const tabIdentifier = new TabIdentifier();

chrome.runtime.onInstalled.addListener(() => {


});
// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let isResponseAsync = false;
  console.log('received,', request);
  if (!request.tabId) {
    return isResponseAsync;
  }
  chrome.windows.create(
    {
      url: `popup.html`,
      type: 'popup',
      height: 600,
      width: 357,
      left: 100,
      top: 100,
      focused: true,
    },
  );
  sendResponse({
    data: {
      message: request,
    },
  });
  return isResponseAsync;
});

/**
 * Fired when a message is sent from another extension/app
 */
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    return true;
  },
);
