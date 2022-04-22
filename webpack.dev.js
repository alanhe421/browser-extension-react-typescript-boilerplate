const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const ExtensionReloader = require('webpack-extension-reloader');
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;

module.exports = merge(common, {
  mode: "development", devtool: "inline-source-map", plugins: argv.reload === 'true' ? [new ExtensionReloader({
    port: 9090, // Which port use to create the server
    reloadPage: true, // Force the reload of the page also
    entries: {
      popup: "popup", background: "eventPage", contentScript: "contentScript"
    }
  })] : []
});
