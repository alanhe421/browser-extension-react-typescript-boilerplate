// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  if (request.popupMounted) {
    console.log('eventPage notified that popup.tsx has mounted.');
  }

  return isResponseAsync;
});

/**
 * Fired when a message is sent from another extension/app
 */
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log('received!');
    chrome.windows.create(
      {
        url: `popup.html`,
        type: 'popup',
        height: 640,
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
    return true;
  },
);
