const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;

const packageJSON = require(`${__dirname}/../package.json`);


const baseJSON = require(`${__dirname}/../src/manifest/base.json`);
const platformJSON = require(`${__dirname}/../src/manifest/${argv.platform || 'chrome'}.json`);

/**
 * 版本采用package.json中配置值
 */
const file = path.join(__dirname, `/../dist/manifest.json`);
fs.writeFileSync(file, JSON.stringify({
  ...baseJSON, ...platformJSON, version: packageJSON.version
}, null, 4), {encoding: 'utf8'});
