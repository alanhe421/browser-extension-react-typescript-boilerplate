const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const {prod} = require("./src/typing");
module.exports = (env = {}) => ({
  entry: {
    popup: path.join(__dirname, "src/popup/index.tsx"),
    eventPage: path.join(__dirname, "src/event-page.ts"),
    contentScript: path.join(__dirname, "src/content-script.ts"),
    sdk: path.join(__dirname, "src/sdk.ts"),
  }, output: {
    path: path.join(__dirname, "dist/"), filename: "[name].js"
  }, module: {
    rules: [{
      exclude: /node_modules/, test: /\.tsx?$/, use: "ts-loader"
    }, {
      exclude: /node_modules/, test: /\.less$/, use: [{
        loader: "style-loader" // Creates style nodes from JS strings
      }, {
        loader: "css-loader" // Translates CSS into CommonJS
      }, {
        loader: "less-loader" // Compiles Less to CSS
      }]
    }]
  }, resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }, plugins: [new webpack.DefinePlugin({
    CRX_CONFIG: JSON.stringify(require('./package.json').crxConfig),
    prod: env.prod
  }), new CopyPlugin({
    patterns: [{from: "node_modules/tea-component/dist/tea.css", to: path.join(__dirname, 'dist/css')}, {
      from: "src/images",
      to: path.join(__dirname, 'dist/images'),
      from: "src/logo",
      to: path.join(__dirname, 'dist/logo'),
    }, {from: "src/popup.html", to: path.join(__dirname, 'dist')},],
  }),],
});
