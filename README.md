# Chrome Extension(开发模版)

> Chrome开发模版

## 主要包含

1. TypeScript`类型安全`
2. Less`样式管理`
3. React-Router`多页面路由管理`
4. localforage`存储方案，方便使用indexedDB，localStorage`
5. react-hook-form`表单校验`
6. tea-component`UI组件`
7. Popup/Background/Content/网页之间通讯机制

## 安装

1. 执行构建
2. Chrome下访问 [_chrome://extensions_](chrome://extensions) 
3. 打开开发者模式, 点击 **Load unpacked extension...** 选择该项目下的dist文件夹即可

## 常见问题

### 网页发消息给插件

```javascript
const extensionId = 'mehfhkhbcmdecgfbcahndjjoooldhmdi';
chrome.runtime.sendMessage(extensionId, {name: 'google'}, (res) => {
  console.log(res)
});
```
