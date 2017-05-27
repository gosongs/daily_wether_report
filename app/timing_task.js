var schedule = require('node-schedule');
var moment = require('moment');
var shelljs = require('shelljs');
var moment = require('moment');

var jokeTask = schedule.scheduleJob('21 * * * *', fireJoke);
var wetherTask = schedule.scheduleJob('00 00 08 * * *', fireWether);
var minusTask = schedule.scheduleJob('00 * * * * *', fireMinus);

console.log('开始监控...')
function fireJoke() {
  // console.log('joke')
  shelljs.exec('node app/jokes.js');
}

function fireWether() {
  shelljs.exec('node app/wether.js');
}

function fireMinus() {
  console.log(moment().format('llll'));
}
