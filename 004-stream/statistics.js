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
    const stats = data.game.reduce((acc, value) => {
      acc = {
        win: acc.win + value.win,
        lose: acc.lose + value.lose
      }
      return acc;
    }, {win: 0, lose: 0});
    console.log(`
      Общее количество партий: ${data.quantityGame}
      Партий выиграно: ${stats.win}
      Партий проиграно: ${stats.lose}
      Процентное соотношение выигранный партий: ${((stats.win * 100) / data.quantityGame).toFixed(2)}%
    `)
  }
})();
