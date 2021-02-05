#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs/promises');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const input = readline.createInterface(process.stdin);
const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv._[0];
fs.access(fileName)
    .then(() => console.log(`Файл для логов ${fileName} уже существует. Введите число 0 или 1`))
    .catch(()=> {
      fs.writeFile(fileName, '')
          .then(() => console.log(`Файл ${fileName} для ведения лога успешно создан. Введите число 0 или 1`));
    });
input.on('line', (data) => {
  if (data === 'next') {
    console.log('Введите число 0 или 1');
    return;
  }
  if (data === 'end') {
    process.exit();
  }
  const randomNumber = Math.round(Math.random());
  game(data, randomNumber)
});
input.on('close', (data) => console.log(data));

function game(data, number) {
  if (+data === number ) {
    console.log(`Вы выиграли, загаданное число ${data}. Введите 'next', чтобы начать новую игру, или 'end', чтобы закончить.`);
    writeLogs({
      quantityGame: 1,
      win: 1,
      lose: 0
    })
  } else {
    console.log(`Вы проиграли, загаданное число ${data}. Введите 'next', чтобы начать новую игру, или 'end', чтобы закончить.`);
    writeLogs({
      quantityGame: 1,
      win: 0,
      lose: 1
    })
  }
}

async function writeLogs(logs) {
  let data = null;
  try {
    data = JSON.parse(await fs.readFile(fileName, 'utf-8'));
  } catch {
    await fs.writeFile(fileName, JSON.stringify(logs));
    return;
  }
  const newData = {
    quantityGame: data.quantityGame + logs.quantityGame,
    win: data.win + logs.win,
    lose: data.lose + logs.lose
  }
  await fs.writeFile(fileName, JSON.stringify(newData));
}