const manifestJSON = require(`${__dirname}/../src/manifest/manifest.json`);
const fs = require('fs');
const path = require('path');
const packageJSON = require(`${__dirname}/../package.json`);
/**
 * 版本采用package.json中配置值
 */
const file = path.join(__dirname, `/../dist/manifest.json`);
fs.writeFileSync(file, JSON.stringify({
  ...manifestJSON, version: packageJSON.version
}), {encoding: 'utf8'});
