# Browser Extension(开发模版)

> 扩展开发模板

## 主要包含

1. TypeScript`类型安全`
2. Less`样式管理`
3. React-Router`多页面内存路由管理`
4. localforage`存储方案，方便使用indexedDB，localStorage`
5. [zustand`状态管理，弥补Context的不足`](https://github.com/pmndrs/zustand)
6. react-hook-form`表单校验`
7. tea-component`UI组件`
8. Hot Reload`开发模式下，自动刷新`
9. 支持不同浏览器打包`支持Chrome，Firefox留有口子，但还未支持`

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
