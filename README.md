#easyspider

a mini spider

##install:

npm install easyspider

##Usage:

var Spider = require('easyspider').Spider;

var spider = new Spider();

spider.route('http://www.baidu.com',function(error, $){

  console.log($('#nv').text());

});

spider.route('http://login.renren.com/ajax/getEncryptKey',{json:true},function(error, json){

  console.log(json);

});

###if you want to change cookie of spider, just do this:

var cookiejar = spider.getCookiejar();

//set cookie

cookiejar.setCookie('a=b','http://www.host.com',function(){});

//get cookie

cookiejar.getCookieString('http://www.host.com',function(err,cookiestring){

})

more usage about cookiejar:https://github.com/goinstant/node-cookie