#!/usr/bin/env node

const path = require('path');
const fs = require('fs/promises');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const fileName = path.parse(argv._[0]).base;
(async function() {
  let data = null;
  try {
    data = JSON.parse(await fs.readFile(fileName, 'utf-8'));
  } catch(err) {
    console.log(err);
  }
  if (data) {
    console.log(`
      Общее количество партий: ${data.quantityGame}
      Партий выиграно: ${data.win}
      Партий проиграно: ${data.lose}
      Процентное соотношение выигранный партий: ${((data.win * 100) / data.quantityGame).toFixed(2)}%
    `)
  }
})();
