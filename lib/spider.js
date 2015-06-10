
var request = require('request');
var jschardet = require("jschardet");
var iconv = require('iconv-lite');
var cheerio = require('cheerio');


var Spider = function(){
  var cookiejar;  //the cookie
  var selfRequest;  //the request

  //对外公开
  this.getCookiejar = function(){
    return cookiejar;
  }

  var setCookiejar = function(jar){
    cookiejar = jar || request.jar();

    selfRequest=request.defaults({
      jar:cookiejar,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0'
      }
    });
  }

  //set default cookiejar
  setCookiejar();

  this.route = function(url,option,callback){
    if(typeof option === 'function'){
      callback = option;
      option = {};
    } else if(typeof option !== 'object'){
      option = {};
    }

    if(option.cookiejar){
      //use the user defined cookiejar
      setCookiejar(option.cookiejar);
    }

    var reqOption = {url:url,encoding:null};

    //支持自定义http headers
    if(option.headers){
      reqOption.headers = option.headers;
    }

    selfRequest(reqOption,function(error,response,body){
      if(error){
        callback(error);
      }else{
        var charset = jschardet.detect(body);
        var content = iconv.decode(body,charset.encoding);

		var err = null;
		var result;
		
        if(option.json){
          try{
            result = JSON.parse(body);
          }catch(e){
            err = e;
          }
        }else{
          try{
            result = cheerio.load(content);
          }catch(e){
            err = e;
          }
        }
		//把callback放try外面，防止callback产生的exception被捕获
        err?callback(err):callback(null,result);
      }
    });
  }


}

module.exports = Spider;

