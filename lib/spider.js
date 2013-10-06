
var request = require('request-5291');
var jschardet = require("jschardet");
var iconv = require('iconv-lite');
var cheerio = require('cheerio');

var Spider = function(){
  var cookiejar = request.jar();
  var selfRequest=request.defaults({
    jar:cookiejar,
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 5.1; rv:19.0) Gecko/20100101 Firefox/19.0'
    }
  });


  this.route = function(url,option,callback){
    if(typeof option === 'function'){
      callback = option;
      option = {};
    } else if(typeof option !== 'object'){
      option = {};
    }
    selfRequest({url:url,encoding:null},function(error,response,body){
      if(error){
        callback(error);
      }else{
        var charset = jschardet.detect(body);
        var content = iconv.decode(body,charset.encoding);

        if(option.json){
          //指定json参数
          try{
            var json = JSON.parse(body);
            callback(null,json);
          }catch(e){
            callback(e);
          }
        }else{
          //parse dom
          var $ = cheerio.load(content);
          callback(null, $);
        }

      }
    });
  }

  //对外公开
  this.cookiejar = cookiejar;

}

exports.Spider = Spider;

