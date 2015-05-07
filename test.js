var Spider = require('./lib/spider').Spider;
var assert = require('assert');

var spider = new Spider();

spider.route('http://www.baidu.com',function(error, $){
  assert.equal($('title').text(),'百度一下，你就知道');
});

spider.route('http://login.renren.com/ajax/getEncryptKey',{json:true},function(error, json){
  assert.equal(json.rkey.length,32);
});

var cookiejar = require('request').jar();
cookiejar.setCookie('key=value','http://www.domain.com',function(){});

spider.route('http://www.baidu.com',{cookiejar:cookiejar},function(error, $){
  spider.getCookiejar().getCookieString('http://www.domain.com',function(err,cookiestring){
    assert.equal(cookiestring,'key=value');
  });
});

