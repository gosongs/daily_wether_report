var md5 = require("blueimp-md5");

var TopClient = require( './topClient' ).TopClient;
var client = new TopClient({
     'appkey' : '23873072' ,
     'appsecret' : 'fbaeacdcb40fdf130305fd3204b46226' ,
     'REST_URL' : ' http://gw.api.taobao.com/router/rest '
});
 
client.execute( 'alibaba.aliqin.fc.sms.num.send' , {
     'extend' : '' ,
     'sms_type' : 'normal' ,
     'sms_free_sign_name' : '' ,
     'sms_param' : "" ,
     'rec_num' : '15800651893' ,
     'sms_template_code' : "SMS_69000137"
}, function(error, response) {
     if (!error) console.log(response);
     else console.log(error);
});