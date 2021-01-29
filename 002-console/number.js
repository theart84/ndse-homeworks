#!/usr/bin/env node
const readline = require('readline');

const input = readline.createInterface(process.stdin);

input.on('line', (data) => {
  checkNumber(data)
});
input.on('close', (data) => console.log(data));

const randomNumber = Math.ceil(Math.random() * 100);
console.log('Input "end" if you wont to end the game!')

function checkNumber(num) {
  if (num === "end") {
    input.emit('close', 'End of game! Thanks!')
    process.exit();
  }
  if (num > randomNumber) {
    console.log('Меньше');
  } else if (num < randomNumber) {
    console.log('Больше');
  } else {
    console.log('Ура Вы угадали');
  }
}



