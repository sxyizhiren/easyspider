var Spider = require('./lib/spider');
var assert = require('assert');
var Step = require('step');

var spider = new Spider();
var noop=function(){}

Step(
	function baidutitle(){
		console.log('baidutitle','start');
		var _this = this;
		spider.route('http://www.baidu.com',function(error, $){
		  assert.equal($('title').text(),'百度一下，你就知道');
		  console.log('baidutitle','[ OK ]');
		  _this();
		});
	},
	function jsonreturn(){
		console.log('jsonreturn','start');
		var _this = this;
		spider.route('http://login.renren.com/ajax/getEncryptKey',{json:true},function(error, json){
		  assert.equal(json.rkey.length,32);
		  console.log('jsonreturn','[ OK ]');
		  _this();
		});	
	},
	function outercookiejar(){
		console.log('outercookiejar','start');
		var _this = this;
		var cookiejar = require('request').jar();
		cookiejar.setCookie('key1=value1','http://www.domain-1.com',noop);
		spider.route('http://www.baidu.com',{cookiejar:cookiejar},function(error, $){
			var cookiestring = spider.getCookiejar().getCookieString('http://www.domain-1.com');
			assert.equal(cookiestring,'key1=value1');
			console.log('outercookiejar','[ OK ]');
			_this();
		});
	},
	function innercookiejar(){
		console.log('innercookiejar','start');
		var _this = this;
		var cookiejar = spider.getCookiejar();
		cookiejar.setCookie('key2=value2','http://www.domain-2.com',noop);

		spider.route('http://www.baidu.com',function(error, $){
			var cookiestring = spider.getCookiejar().getCookieString('http://www.domain-2.com');
			assert.equal(cookiestring,'key2=value2');
			console.log('innercookiejar','[ OK ]');
			_this();
		});	
	}

);


