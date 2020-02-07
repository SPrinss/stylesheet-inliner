const argv = require('minimist')(process.argv.slice(2));
const stylesheetInliner = require('../src/stylesheet-inliner.js');

const inlinedCss = stylesheetInliner(argv.linkTag, argv.originalFilePath);
console.log(inlinedCss)
process.exit()