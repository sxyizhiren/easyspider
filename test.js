var Spider = require('./lib/spider').Spider;
var assert = require('assert');

var spider = new Spider();

spider.route('http://www.baidu.com',function(error, $){
  assert.equal($('#nv').text(),'新 闻　网 页　贴 吧　知 道　音 乐　图 片　视 频　地 图');
});

spider.route('http://login.renren.com/ajax/getEncryptKey',{json:true},function(error, json){
  assert.equal(json.rkey,'d0cf42c2d3d337f9e5d14083f2d52cb2');
});

var cookiejar = require('request').jar();
cookiejar.setCookie('key=value','http://www.domain.com',function(){});

spider.route('http://www.baidu.com',{cookiejar:cookiejar},function(error, $){
  spider.getCookiejar().getCookieString('http://www.domain.com',function(err,cookiestring){
    assert.equal(cookiestring,'key=value');
  });
});

