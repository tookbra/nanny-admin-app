import Vue from "vue";
const statusMap = {
  1: "正常",
  2: "禁用"
};
Vue.filter("statusFilter", function(status) {
  return statusMap[status];
});

Vue.filter("typeFilter", function(type, typeMap) {
  return typeMap.get(type + "");
});

/**
 * 日期格式化
 */
export function dateFormat (date) {
  let format = 'yyyy-MM-dd hh:mm:ss'
  if (date != 'Invalid Date') {
    var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  }
  return ''
}
