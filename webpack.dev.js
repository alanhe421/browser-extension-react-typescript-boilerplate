const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = (env = {}) => {
  return merge(common, {
    mode: "development", devtool: "inline-source-map", plugins: (env.reload === 'true' ? [new ExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: {
        popup: "popup", background: "eventPage", contentScript: "contentScript"
      }
    })] : [])
  });
};
