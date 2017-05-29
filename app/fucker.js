const cheerio = require('cheerio');
const request = require('request');

const url = 'http://3344jr.com/xiaoshuoqu/qinggan/index_2.html';

request(url, function (err, res, body) {
  console.log(body)
  if (!err && res.statusCode === 200) {
    var $ = cheerio.load(body);
    let novels = {};
    $('.news_list li a').each((_, i) => {
      const $el = $(_);
      console.log($el.attr('title'));
      // novels.name = $el.text();
    });
  };

  // console.log(novels)
})