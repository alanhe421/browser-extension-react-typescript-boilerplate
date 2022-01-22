# Chrome Extension(开发模版)

> Chrome开发模版

## include

1. TypeScript`类型安全`
2. Less`样式管理`
3. React-Router`多页面路由管理`
4. localforage`存储方案，方便使用indexedDB，localStorage`
5. react-hook-form`表单校验`
6. tea-component`UI组件`
7. Popup/Background/Content/网页之间通讯机制

## Installation

1. Complete the steps to build the project above
2. Go to [_chrome://extensions_](chrome://extensions) in Google Chrome
3. With the developer mode checkbox ticked, click **Load unpacked extension...** and select the _dist_ folder from this
   repo

## 常见问题

### 网页发消息给插件

```javascript
const extensionId = 'mehfhkhbcmdecgfbcahndjjoooldhmdi';
chrome.runtime.sendMessage(extensionId, {name: 'google'}, (res) => {
  console.log(res)
});
```
