window.extSdk = {
  sendMessage: (msg: string) => {
    window.postMessage({
      data: msg,
      type: 'fromPage',
    }, '*');
  },
};
