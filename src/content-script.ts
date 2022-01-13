console.log('content-script loaded.');

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
