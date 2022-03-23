/**
 * 自定义Window属性
 */
window.extSdk = {
  version: require('../package.json').version,
  sendMessage: (msg: string) => {
    window.postMessage({
      data: msg,
      type: 'fromPage',
    }, '*');
  },
};
