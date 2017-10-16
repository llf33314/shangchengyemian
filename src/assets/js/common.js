
import conf from './conf';
import axios from 'axios';

var oproto = Object.prototype;
var serialize = oproto.toString;
var Rxports = {
	/**
	  * 封装axios，减少学习成本，参数基本跟jq ajax一致
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Object} headers			自定义请求headers
	  * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
	  * @param {Function} error		发送请求前
	  * @param return 
	*/
	ajax:function (opt){
		var opts = opt || {};
		
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		
		axios({
			method: opts.type || 'post',
			url: opts.url,
			params: opts.data || {},
			headers: opts.headers || {
			  	'Content-Type':'application/x-www-form-urlencoded'
			},
			timeout: opts.time || 10*1000,
			responseType: opts.dataType || 'json'
		}).then(function(res){
			
			if(res.status == 200 ){
				
				if(opts.success){
					opts.success(res.data,res);
				}
				
			}else{
				
				if (data.error) {
					opts.error(error);
				}else{
					console.log('error');
				}
				
			}
			
				
		}).catch(function (error){
			if (opts.error) {
				opts.error(error);
			}else{
				console.log('catch');
			}
		});
			
	},
	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	isArrayLike:function(obj) {
		if (!obj)
			return false
		var n = obj.length
		if (n === (n >>> 0)) { //检测length属性是否为非负整数
			var type = serialize.call(obj).slice(8, -1)
			if (/(?:regexp|string|function|window|global)$/i.test(type))
				return false
			if (type === "Array")
				return true
			try {
				if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
					return /^\s?function/.test(obj.item || obj.callee)
				}
				return true
			} catch (e) { //IE的NodeList直接抛错
				return !obj.window //IE6-8 window
			}
		}
		return false
	},
	/*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
    each: function (obj, fn) {
    	var That = this;
        if (obj) { //排除null, undefined
            var i = 0
            if (That.isArrayLike(obj)) {
                for (var n = obj.length; i < n; i++) {
                    if (fn(i, obj[i]) === false)
                        break
                }
            } else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
                        break
                    }
                }
            }
        }
    },
	/**
	  * 获取url传过来的参数
	  * @param name 	获取的参数
	  * @param Url 		自定义获取参数的链接
	  * @param return
	*/
	getUrlQuery:function (name,Url){
	
	   //URL GET 获取值
　　   var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"),
             url = Url || location.href;
　　     if (reg.test(url))
　　     return unescape(RegExp.$2.replace(/\+/g, " "));
　　     return "";
	
	},
	/**       
       * 时间戳转换日期（有时分秒）       
       * @param date 时间戳    
       */
	format:function(date){
		let add0 = (m) => m<10?'0'+m:m;
		//shijianchuo是整数，否则要parseInt转换
		let time = new Date(date);
		let y = time.getFullYear();
		let m = time.getMonth()+1;
		let d = time.getDate();
		let h = time.getHours();
		let mm = time.getMinutes();
		let s = time.getSeconds();
		return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
	},
	/**       
       * 时间戳转换日期（无时分秒）       
       * @param date 时间戳    
       */
	  formatNot:function(date){
		let add0 = (m) => m<10?'0'+m:m;
		//shijianchuo是整数，否则要parseInt转换
		let time = new Date(date);
		let y = time.getFullYear();
		let m = time.getMonth()+1;
		let d = time.getDate();
		return y+'-'+add0(m)+'-'+add0(d);
	  },

	/*正则表达式*/
	/**
	 * 检验电话
	 * @param {Number} num
	 * @returns {Boolean}
	 */
	validPhone:function(num) {
		let phoneReg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		return phoneReg.test(num);
	},
	/**
	 * url
	 */
	validURL:function (url) {
		let regex = /^(https?:\/\/)?[\u4e00-\u9fa50-9a-zA-Z][-\u4e00-\u9fa50-9a-zA-Z]{0,62}(\.[-\u4e00-\u9fa50-9a-zA-Z]{1,63})*(\.[-\u4e00-\u9fa50-9a-zA-Z]{0,62}[\u4e00-\u9fa50-9a-zA-Z])(:[0-9]{0,5})?(\/[\w\.-]*)*(#[^#\s]*)?$/i;
		if (url.length < 1 || url.length > 256) {
			return false;
		}
		return regex.test(url);
	},
	/**
	 * 校验邮箱
	 * @param {String} email
	 * @returns {Boolean}
	 */
	validEmail:function (email) {
		let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		//let emailReg = /^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return emailReg.test(email);
	},
	/**
	 * 校验价格
	 * @param {String} money
	 * @returns {Boolean}
	 */
	validMoney:function (money) { 
		//不超过6位整数且保留2位小数
	   let moneyReg = /^\d{0,6}(.[0-9]{2})?$/;
	   return moneyReg.test(money);
   },
	/**
	 * 校验身份证
	 * @param {String} IDcard
	 * @returns {Boolean}
	 */
	
	validIDnumber:function (IDcard) { 
		var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
		var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
		var varArray = new Array();
		var intValue;
		var lngProduct = 0;
		var intCheckDigit;
		var intStrLen = IDcard.length;
		var idNumber = IDcard;
		// initialize
		if ((intStrLen != 15) && (intStrLen != 18)) {
		return false;
		}
		// check and set value
		for (let i = 0; i < intStrLen; i++) {
		varArray[i] = idNumber.charAt(i);
		if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
			return false;
		} else if (i < 17) {
			varArray[i] = varArray[i] * factorArr[i];
		}
		}
		if (intStrLen == 18) {
		// check date
		var date8 = idNumber.substring(6, 14);
		if (Rxports.isDate8(date8) == false) {
			return false;
		}
		// calculate the sum of the products
		for ( let i = 0; i < 17; i++) {
			lngProduct = lngProduct + varArray[i];
		}
		// calculate the check digit
		intCheckDigit = parityBit[lngProduct % 11];
		// check last digit
		if (varArray[17] != intCheckDigit) {
			return false;
		}
		} else { // length is 15
		// check date
		var date6 = idNumber.substring(6, 12);
		if (Rxports.isDate6(date6) == false) {
			return false;
		}
		}
		return true;
		// let IDcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		// return IDcardReg.test(IDcard);
	},
	//15位身份证
	isDate6:function(sDate) {
		if (!/^[0-9]{6}$/.test(sDate)) {
		return false;
		}
		var year, month, day;
		year = sDate.substring(0, 4);
		month = sDate.substring(4, 6);
		if (year < 1700 || year > 2500)
		return false
		if (month < 1 || month > 12)
		return false
		return true
	},
	//18位身份证
	isDate8:function(sDate) {
		if (!/^[0-9]{8}$/.test(sDate)) {
		return false;
		}
		var year, month, day;
		year = sDate.substring(0, 4);
		month = sDate.substring(4, 6);
		day = sDate.substring(6, 8);
		var iaMonthDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ]
		if (year < 1700 || year > 2500)
		return false
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
		iaMonthDays[1] = 29;
		if (month < 1 || month > 12)
		return false
		if (day < 1 || day > iaMonthDays[month - 1])
		return false
		return true
	}
};


export default Rxports;


































