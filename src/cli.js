#! /usr/bin/env node

const argv = require('yargs').argv;
const inlineStyles = require('./stylesheet-inliner');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

const inputPattern = argv.input;
if(!inputPattern) return;

// options is optional
glob(inputPattern, {}, (err, files) => {
  if(err) return;
  
  for(var i in files) {
    const fileURL = files[i];
    const baseURI = path.dirname(path.resolve(fileURL));
    const fileContents = fs.readFileSync(fileURL).toString();
    const newContents = inlineStyles(fileContents, baseURI);
    fs.writeFileSync(fileURL, newContents);
  }
  
})