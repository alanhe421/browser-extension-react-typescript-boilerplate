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

### 业务代码中读取manifest配置
> 全局已经注入了变量app.manifest用于获取相关配置

```javascript
// 获取版本号
app.manifest.version

```

### 删除tea-component
> 如果觉得内置的tea-component不合适，可以操作如下步骤进行卸载

- /dist/popup.html中删除`<link rel="stylesheet" href="css/tea.css">`
- webpack.common.js中删除CopyPlugin/copy样式操作
  ```javascript
  {from: "node_modules/tea-component/dist/tea.css", to: "../css"},
  ```

### 全局常量配置

- 模版库提供的方案是package.json中crxConfig自定义字段配置，代码中直接`CRX_CONFIG.xxx`消费即可
- 当然可以直接代码中增加配置常量
