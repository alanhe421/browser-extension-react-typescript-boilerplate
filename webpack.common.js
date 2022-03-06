const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
require(`${__dirname}/development/manifest`);
module.exports = {
  entry: {
    popup: path.join(__dirname, "src/popup/index.tsx"),
    eventPage: path.join(__dirname, "src/event-page.ts"),
    contentScript: path.join(__dirname, "src/content-script.ts"),
  }, output: {
    path: path.join(__dirname, "dist/js"), filename: "[name].js"
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
    CRX_CONFIG: JSON.stringify(require('./package.json').crxConfig)
  }), new CopyPlugin({
    patterns: [{from: "node_modules/tea-component/dist/tea.css", to: "../css"}, {
      from: "src/images", to: "../"
    }, {from: "src/popup.html", to: "../"},],
  }),],
};
