#easyspider
- [![NPM version](https://badge.fury.io/js/easyspider.png)](http://badge.fury.io/js/easyspider)
- [![Dependencies Status](https://david-dm.org/sxyizhiren/easyspider.png)](https://david-dm.org/sxyizhiren/easyspider)
- [![Build Status](https://travis-ci.org/sxyizhiren/easyspider.png?branch=master)](https://travis-ci.org/sxyizhiren/easyspider)
a mini spider

##install:

npm install easyspider

##Usage:

```

	function get_title(){
		console.log('get_title','start');
		spider.route('http://www.baidu.com',function(error, $){
		  assert.equal($('title').text(),'百度一下，你就知道');
		  console.log('get_title','[ OK ]');
		});
	}
	function get_json(){
		console.log('get_json','start');
		spider.route('http://login.renren.com/ajax/getEncryptKey',{json:true},function(error, json){
		  assert.equal(json.rkey.length,32);
		  console.log('get_json','[ OK ]');
		});	
	}
	function use_outer_cookiejar(){
		console.log('use_outer_cookiejar','start');
		var cookiejar = require('request').jar();
		cookiejar.setCookie('key1=value1','http://www.domain-1.com',noop);
		spider.route('http://www.baidu.com',{cookiejar:cookiejar},function(error, $){
			var cookiestring = spider.getCookiejar().getCookieString('http://www.domain-1.com');
			assert.equal(cookiestring,'key1=value1');
			console.log('use_outer_cookiejar','[ OK ]');
		});
	}
	function use_inner_cookiejar(){
		console.log('use_inner_cookiejar','start');
		var cookiejar = spider.getCookiejar();
		cookiejar.setCookie('key2=value2','http://www.domain-2.com',noop);

		spider.route('http://www.baidu.com',function(error, $){
			var cookiestring = spider.getCookiejar().getCookieString('http://www.domain-2.com');
			assert.equal(cookiestring,'key2=value2');
			console.log('use_inner_cookiejar','[ OK ]');
		});	
	}


```

