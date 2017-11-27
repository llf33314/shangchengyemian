/*
 * vuejs 	过滤器
 * time 	2017年11月27日 18:46:54
 */

import Vue from 'vue';
import accounting from 'accounting';

/**
  * 格式化数字，相当于vue1.0时的currency过滤器
  * @param value 		传进来的数字
  * @param symbol	 	货币称号，默认为人民币
  * @param dat	 		保留的小数点位数，默认为2位
  * @param return 
*/
Vue.filter('currency', function (value,symbol='¥',dat=2) {
  
  return accounting.formatMoney(value,symbol,dat);
  
})
/**
  * 格式化时间，
  * @param date 时间戳    
  * @param return 
*/
Vue.filter('format', function (value,symbol='¥',dat=2) {
  let add0 = (m) => m<10?'0'+m:m;
  let time = new Date(date);
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
})
/**
  * 格式化时间，时间戳转换日期（无时分秒）   
  * @param date 时间戳    
  * @param return 
*/
Vue.filter('formatNot', function (value,symbol='¥',dat=2) {
  let add0 = (m) => m<10?'0'+m:m;
  let time = new Date(date);
  let y = time.getFullYear();
  let m = time.getMonth()+1;
  let d = time.getDate();
  return y+'-'+add0(m)+'-'+add0(d);
})