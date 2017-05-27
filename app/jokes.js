const cheerio = require('cheerio');
const request = require('request');
const async = require('async');
const config = require('./config');
const nodemailer = require("nodemailer");

let pageNum = 1;
let maxPageNum = 20;
let jokeType = 'text';

var jokesData = [];
var urls = [];
var emails = [];
var EMAIL = {
  host: 'smtp.163.com',
  port: 25,
  auth: {
    user: 'by_openwater@163.com',
    pass: 'liuzhiyuan1993'
  }
};
for (var i = 1; i <= maxPageNum; i++) {
  urls.push(`http://www.qiushibaike.com/${jokeType}/page/${i}/?s=4978418`)
}

config.userList.map((_, i) => {
  emails.push(_.email);
})

async.mapLimit(urls, 1, function (url, callback) {
  fetchJokes(url, callback);
}, function (err, res) {
  console.log('Final:');
  console.log(jokesData.length);
  sendEmail();
})

function fetchJokes(url, callback) {
  request({
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    }
  }, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      var $ = cheerio.load(body);
      $('#content-left>div').each((i, _) => {
        const $el = $(_);
        let joke = {};
        joke.author = $el.find('.author h2').text();
        joke.content = $el.find('.content>span').text();
        jokesData.push(joke);
      });
      console.log(`当前: ${url}`);
      callback(null, url);
    } else {
      console.log('出错了');
      console.log(err);
      callback(null, url);
    }
  });
}

function sendEmail() {
  async.mapLimit(emails, 1, function (email, callback) {
    fireEmail(email, callback);
  }, function (err, res) {
    console.log('Mail Send Over');
  });
}

function fireEmail(email, callback) {
  var html = '';
  jokesData.map((_, i) => {
    var t = `<p>${_.content}</p></br></br>`;
    html += t;
  });
  var data = {
    from: EMAIL.auth.user,
    to: email,
    subject: '每日笑话',
    html: html
  };
  var transporter = nodemailer.createTransport(EMAIL);
  transporter.sendMail(data, function (error, info) {
    if (error) {
      console.log('Mail Error: ' + email);
    } else {
      console.log('Mail Success: ' + email);
    }
    callback(null, email);
  });
}