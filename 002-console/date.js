#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

const isAdd = argv._.includes('add');
const isSub = argv._.includes('sub');

if (isAdd) {
  console.log(new Date(Date.now() + (argv.d || argv.date * 86400000)));
  process.exit();
}
if (isSub) {
  console.log(new Date(Date.now() - (argv.month || argv.m * 2592000000)));
  process.exit();
}

if (argv.year || argv.y) {
  console.log(new Date().getFullYear());
} else if (argv.month || argv.m) {
  console.log(new Date().getMonth());
} else if (argv.date || argv.d) {
  console.log(new Date().getDate());
} else {
  console.log(new Date().toISOString())
}

