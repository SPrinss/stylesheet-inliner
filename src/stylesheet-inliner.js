const { readFileSync } = require('fs');
const path = require('path');

const stylesheetInliner = (linkTag, originalFilePath, indent = '') => {
  const stylesheetURL = linkTag.match(/href\="(.*?)"/i)[1];
  if(stylesheetURL.match(/^http/)) return linkTag;
  const stylesheetFilePath = _parseFilePath(originalFilePath, stylesheetURL);
  const file = readFileSync(stylesheetFilePath);
  const fileString = file.toString().replace(/$\n^(| )/gm, `\n${indent}`)
  return `
    <style>
      ${fileString}
    </style>
  `;
}

const _parseFilePath = (originalFilePath, cssRelFilePath) => {
  const folderPath = originalFilePath.substring(0, originalFilePath.lastIndexOf('/'));
  const cssFilePath = path.join(folderPath, cssRelFilePath);
  return cssFilePath;
}

module.exports = stylesheetInliner;