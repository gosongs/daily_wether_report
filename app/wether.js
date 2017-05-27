var http = require("http");
var nodemailer = require("nodemailer");
var cityList = require("./cityList");
var config = require("./config");
var userList = config.userList;

/**
 * 获取天气数据
 */
userList.map(function (_, i) {
  var url = "http://www.weather.com.cn/data/cityinfo/" + cityList[_.city] + ".html";

  http.get(url, function (res) {
    var jsonData = '';
    res.on("data", function (data) {
      jsonData += data.toString('utf8');
    });

    res.on("end", function () {
      sendEmail(JSON.parse(jsonData), _.email);
    });
  })
});

var config = {
  host: 'smtp.163.com',
  port: 25,
  auth: {
    user: 'by_openwater@163.com',
    pass: 'liuzhiyuan1993'
  }
};
var transporter = nodemailer.createTransport(config);

/**
 * 将天气发送给用户
 * @param {object} weather 
{ weatherinfo: 
   { city: '青岛',
     cityid: '101120201',
     temp1: '3℃',
     temp2: '8℃',
     weather: '晴转多云',
     img1: 'n0.gif',
     img2: 'd1.gif',
     ptime: '18:00' 
    } 
  }
 * @param {string} email 
 */
function sendEmail(weather, email) {
  var wInfo = weather.weatherinfo;
  var sub = '今日' + wInfo.city + '天气: ' + wInfo.weather;
  var con = `${wInfo.city}: <br/>
            <b>天气: </b>${wInfo.weather};<br/>
            <b>最低气温: </b>${wInfo.temp1};<br/>
            <b>最高气温: </b>${wInfo.temp2};<br/>
            <b>统计时间: </b>${wInfo.ptime};<br/>`;
  var data = {
    from: config.auth.user,
    to: email,
    subject: sub,
    html: con
  };
  transporter.sendMail(data, function (error, info) {
    if (error) {
      console.log('Mail Error: ' + email);
    } else {
      console.log('Mail Success: ' + email);
    }
  })
}
