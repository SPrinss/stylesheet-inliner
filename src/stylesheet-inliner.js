const { readFileSync } = require('fs');
const path = require('path');

function main(code, baseURI) {
  return code.replace(/<link.*?rel="stylesheet".*?>/gi, (linkTag) => inlineStyles(linkTag, baseURI));
}

function inlineStyles(linkTag, baseURI) {
  const linkURL = linkTag.match(/href\="(.*?)"/i)[1];
  const cssURL = path.join(path.dirname(baseURI), linkURL);
  return `<style>${readFileSync(cssURL).toString()}</style>`
}

module.exports = main;