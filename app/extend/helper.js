const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();


const utils = require('utility');
exports.md5 =  str => utils.md5(str);


//错误信息查找
exports.findError = function(array,key){

  for (var i = 0; i < array.length; i++) {

    if (array[i].field == key) {
      return array[i];
    }
  }
  return null;
}
