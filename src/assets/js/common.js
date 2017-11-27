
import conf from './conf';
import axios from 'axios';

var Rxports = {
	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	isArrayLike: function (obj) {
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
	getUrlQuery: function (name, Url) {

		//URL GET 获取值
		var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
			url = Url || location.href;
		if (reg.test(url))
			return unescape(RegExp.$2.replace(/\+/g, " "));
		return "";

	},
	/**
     * 获取URL参数
     * @param name 参数名
     * @rteurn {String}
     */
	getQueryString: function (name) {
		if (!name) return null;
		return window.location.href.split('?' + name + '=')[1];
		/*var reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)(&|$)'), array = location.search.match(reg);
		 return array ? decodeURIComponent(array[2]) : null;*/
	},
	//JSON字符串转json对象
	strToJson: function (str) {
		var json = eval('(' + str + ')');
		return json;
	},
	/**
	 * 获取cookie
	 * @param {String} key 键
	 * @return {String}
	 */
	getCookie: function (key) {
		if (!key) return null;
		var reg = new RegExp('(?:; )?' + key + '=([^;]*);?');
		return reg.test(document.cookie) ? decodeURIComponent(RegExp['$1']) : null;
	},

	/**
	 * 设置cookie
	 * @param {String} key 键
	 * @param {String} value 值
	 * @param {Int} hours 过期时间(小时),默认3小时
	 */
	setCookie: function (key, value, hours) {
		hours = hours || 3;
		if (key && value) {
			var expireTime = new Date();
			expireTime.setTime(expireTime.getTime() + Number(hours) * 3600 * 1000);
			document.cookie = key + '=' + value + '; path=/;expires = ' + expireTime.toGMTString();
		} else {
			return 'no key or value';
		}
	},

	/**
	 * 删除cookie
	 * @param key 键
	 */
	removeCookie: function (key) {
		var expireTime = new Date();
		expireTime.setTime(expireTime.getTime() - 1);
		var value = this.getCookie(key);
		if (value) {
			document.cookie = key + '=' + value + ';path=/;expires=' + expireTime.toGMTString();
		}
	},

	/**
	 * 清除所有cookie
	 */
	clearCookie: function () {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys) {
			for (var i = keys.length; i--;)
				document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
		}
		return this;
	},
	/*正则表达式*/
	/**
	 * 检验电话
	 * @param {Number} num
	 * @returns {Boolean}
	 */
	validPhone: function (num) {
		let phoneReg = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		return phoneReg.test(num);
	},
	/**
	 * url
	 */
	validURL: function (url) {
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
	validEmail: function (email) {
		let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		//let emailReg = /^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return emailReg.test(email);
	},
	/**
	 * 校验价格
	 * @param {String} money
	 * @returns {Boolean}
	 */
	validMoney: function (money) {
		//不超过6位整数且保留2位小数
		let moneyReg = /^\d{0,6}(.[0-9]{2})?$/;
		return moneyReg.test(money);
	},
	/**
	 * 校验身份证
	 * @param {String} IDcard
	 * @returns {Boolean}
	 */

	validIDnumber: function (IDcard) {
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
			for (let i = 0; i < 17; i++) {
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
	isDate6: function (sDate) {
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
	isDate8: function (sDate) {
		if (!/^[0-9]{8}$/.test(sDate)) {
			return false;
		}
		var year, month, day;
		year = sDate.substring(0, 4);
		month = sDate.substring(4, 6);
		day = sDate.substring(6, 8);
		var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
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


































