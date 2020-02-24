const { readFileSync } = require('fs');
const path = require('path');

function main(code, fileURL) {
  return code.replace(/<link.*?rel="stylesheet".*?>/gi, (linkTag) => inlineStyles(linkTag, fileURL));
}

function inlineStyles(linkTag, fileURL) {
  const linkURL = linkTag.match(/href\="(.*?)"/i)[1];
  const cssURL = path.join(path.dirname(fileURL), linkURL);
  return `<style>${readFileSync(cssURL).toString()}</style>`
}

module.exports = main;