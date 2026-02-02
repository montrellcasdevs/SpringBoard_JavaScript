#!/usr/bin/env node
/** Command-line tool to generate Markov text. */

const fs = require('fs');
const { MarkovMachine } = require('./markov');

const [,, type, pathOrUrl, numWordsArg] = process.argv;
const numWords = numWordsArg ? Number(numWordsArg) : 100;

if (!type || !pathOrUrl) {
  console.error("Usage: node makeText.js file FILEPATH | url URL [numWords]");
  process.exit(1);
}

async function getText() {
  try {
    if (type === 'file') {
      return fs.readFileSync(pathOrUrl, 'utf8');
    } else if (type === 'url') {
      const axios = require('axios');
      const resp = await axios.get(pathOrUrl);
      return resp.data;
    } else {
      console.error("First arg must be 'file' or 'url'");
      process.exit(1);
    }
  } catch (err) {
    console.error(`Error fetching ${type} ${pathOrUrl}: ${err.message}`);
    process.exit(1);
  }
}

(async function main() {
  const text = await getText();
  const mm = new MarkovMachine(text);
  console.log(mm.makeText(numWords));
})();

