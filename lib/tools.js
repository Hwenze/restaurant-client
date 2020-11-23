/* 工具类 */
import Vue from 'vue';

var tools = {
	
	// 服务器域名
	// apiUrl: 'https://test.api.shop.yuexiaoyao8.com',
	apiUrl: 'http://127.0.0.1:8083',

	/* ajax请求 */
	ajax: function(option) {
		const that = this;
		
		//判断url
		let url = (option.url !== undefined) ? (that.apiUrl + option.url) : that.apiUrl + '/';

		let data = {
			url: url, //接口地址
			ajaxData: option.ajaxData || {},		//请求所传参数
			successFun: option.successFun || '',	//成功回调方法  function (res) {},
			errorFun: option.errorFun || '',		//错误回调方法  function (error_data, status, headers, error_obj) {}
			type: option.type || 'POST',			//请求方法,大写 POST,GET,PUT,DELETE
			timeout: option.timeout || 10000, 		//请求超时时间
			dataType: option.dataType || "json",	//请求数据格式，ie9
			isLoading: option.isLoading || 0
		};

		if (data.isLoading) {
			that.alert.loading();
		}

		uni.request({
			method: data.type,
			url: data.url,
			data: data.ajaxData,
			timeout: data.timeout,
			header: {
				'X-ISAPI': 1,
				'Authorization': this.cache.get('token') || ''
			},
			success: (response) => {
				if (response.statusCode === 200) {
					if (data.isLoading) {
						that.alert.closeLoading();
					}
					if (typeof data.successFun == 'function') {
						try {
							data.successFun(response.data);
						} catch (e) {
							console.error(e);
						}
					}
				} else {
					//尝试关闭加载动画
					that.alert.closeLoading();
					var error = {
						response: response.data
					}
					if (!error.response) {
						console.log('Error', error.message);

						if (error.message.indexOf('timeout') >= 0) {
							that.alert.toast('网络超时，请刷新页面');
						} else {
							that.alert.toast('网络开小猜了，请刷新页面', 3000);
						}
						return;
					}

					let status = error.response.status;		//状态码
					let error_data = error.response;		//错误内容
					let headers = error.response.headers;	//错误头部
					let errcode = error_data.error_code;

					if (status === 500) {
						error_data.error_msg = error_data.request_id ? '服务器异常。request_id：' + error_data.request_id : '服务器异常';
					}
				}
			},
			fail: (err) => {
				console.log(err);
			}
		});

	},

	/* 去掉两边空格 */
	trim: function trim(str) {
		str = str.toString() || '';
		return str.replace(/(^\s*)|(\s*$)/g, '');
	},

	/**
	 * 日期格式转换(formateDate)
	 * @param  datetime    "2020-11-23T16:00:00.000Z"格式
	 * @return
	 */
	formateDate: function(datetime, format = 'YYYY-MM-DD HH:mm:ss') {
		function addDateZero(num) {
			return (num < 10 ? "0" + num : num);
		}
		let d = new Date(datetime);
		let formatdatetime = (format.includes('YYYY') ? d.getFullYear() : '')
							+ (format.includes('MM') ? '-' + addDateZero(d.getMonth() + 1) : '')
							+ (format.includes('DD') ? '-' + addDateZero(d.getDate()) : '') + ' ' 
							+ (format.includes('HH') ? addDateZero(d.getHours()) : '')
							+ (format.includes('mm') ? ':' + addDateZero(d.getMinutes()) : '')
							+ (format.includes('ss') ? ':' + addDateZero(d.getSeconds()) : '');
		return formatdatetime;
	},

	/* 获取当前时间开始 */
	now: function() {
		return (new Date()).getTime();
	},

	/* 获取php的时间戳 */
	time: function() {
		return parseInt(this.now() / 1000);
	},

	/* 判断是否空 */
	isEmpty: function(value) {
		if (value === null || value === undefined || value === '' || value === false) {
			return true;
		}

		//判断对象
		if (typeof value === 'object' && Object.getOwnPropertyNames(value).length === 0) {
			return true;
		}

		return false;
	},

	/* url操作 */
	url: {
		/* 地址栏get参数对象 */
		query: function(url) {
			var __url = '';
			if (url) {
				__url = url.substring(url.indexOf('?'));
			} else if (location.href.indexOf('?') >= 0) {
				__url = location.href.substring(location.href.indexOf('?'));
			}
			var str = __url.substr(1);

			if (str.indexOf('#') >= 0) {
				str = str.split('#')[0];
			}

			var UrlObj = {},
				urlArr = str.split('&');

			if (str === "") return UrlObj;

			for (var i = 0, len = urlArr.length; i < len; i++) {
				var get_Url = urlArr[i].split('='),
					url = '';

				for (var j = 0; j < get_Url.length; j++) {
					if (j !== 0) {
						get_Url[j] = get_Url[j] === "" ? '=' : get_Url[j];
						url += get_Url[j];
					}
				}

				UrlObj[get_Url[0]] = url;
			}
			return UrlObj;
		},

		/* 获取地址栏get参数 */
		params: function(query) {
			return this.query()[query];
		},

		/* 替换地址栏中的参数 */
		replaceParamVal: function(arg, arg_val, url) {
			if (url === undefined) {
				url = window.location.href.toString();
			}
			var pattern = arg + '=([^&]*)';
			var replaceText = arg + '=' + arg_val;

			if (url.match(pattern)) {
				var tmp = '/(' + arg + '=)([^&]*)/gi';
				tmp = url.replace(eval(tmp), replaceText);
				return tmp;
			} else {
				if (url.match('[\?]')) {
					return url + '&' + replaceText;
				} else {
					return url + '?' + replaceText;
				}
			}
		},

		/* 批量替换地址栏中的参数 */
		replaceParamVals: function(params, url) {
			if (tools.isEmpty(params) && tools.isEmpty(url)) {
				url = window.location.href.toString();
			} else {
				for (var key in params) {
					url = this.replaceParamVal(key, params[key], url);
				}
			}

			return url;
		},

		/* 改变地址栏url */
		changeUrl: function(url, data) {
			var history = data || {};
			if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") ==
				"MSIE9.0") {

			} else {
				window.history.pushState(history, 0, url);
			}
		},

		/* 改变地址栏url */
		replaceUrl: function(url, data) {
			var history = data || {};
			if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") ==
				"MSIE9.0") {

			} else {
				window.history.replaceState(history, 0, url);
			}

		},

		/* 获取域名 */
		getOrigin: function() {
			var url = '';

			if (!location.port) {
				url = location.protocol + '//' + location.hostname;
			} else {
				url = location.protocol + '//' + location.hostname + ':' + location.port;
			}

			return url;
		}
	},

	/* 缓存 */
	cache: {
		/* 获取 */
		get: function(key) {
			return uni.getStorageSync(key);
		},

		/* 保存 */
		set: function(key, value) {
			return uni.setStorageSync(key, value);
		},

		/* 删除 */
		del: function(key) {
			return uni.removeStorageSync(key);
		}
	},

	/* 网页标题 */
	title: {
		/* 获取 */
		get: function() {
			return document.title;
		},

		/* 设置 */
		set: function(value) {
			return document.title = value;
		}
	},

	/* 获取生成内容 */
	get: {
		/* 生成guid */
		guid: function guid() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		}
	},

	/* 删除对象中为空的属性 */
	deleteObj: function(obj) {
		for (var v in obj) {
			if (obj.hasOwnProperty(v)) {
				if (obj[v] === "" || obj[v] === undefined || obj[v] === null) {
					delete obj[v];
				}
			}
		}
		return obj;
	},

	/* 排序验证 */
	ksort: function(data) {
		var keys = [],
			k, i, len;

		for (k in data) {
			if (data.hasOwnProperty(k)) {
				keys.push(k);
			}
		}

		keys.sort();

		len = keys.length;
		var obj = {};
		for (i = 0; i < len; i++) {

			k = keys[i];
			obj[k] = data[k];
		}
		return obj;
	},

	// 加载中提示
	alert: {
		loading: function(txt) {
			uni.showLoading({
				title: txt ? txt : '加载中',
				mask: true
			});
		},
		
		closeLoading: function(txt) {
			uni.hideLoading();
		},
		
		toast: function(txt) {
			uni.showToast({
				title: txt,
				duration: 2000,
				position: 'bottom',
				icon: 'none'
			});
		},
		
		success: function(txt) {
			uni.showToast({
				title: txt,
				duration: 2000,
				position: 'bottom',
				icon: 'success'
			});
		},
		
		closeToast: function(txt) {
			uni.hideToast();
		}
	},

	mywx: {
		// _wx: jweixin,
		// init(url){
		// 	var jsApiList = [];
		// 	jsApiList.push('onMenuShareTimeline');
		// 	jsApiList.push('onMenuShareAppMessage');
		// 	window.wx = jweixin;
		// 	tools.ajax({
		// 		url: '/api/wechat/js',
		// 		ajaxData: {
		// 			url: location.host + location.pathname
		// 		},
		// 		type: 'POST',
		// 		successFun: function(res) {
		// 			wx.config({
		// 				debug: false,
		// 				appId: res.data.sign.appId,
		// 				timestamp: res.data.sign.timestamp,
		// 				nonceStr: res.data.sign.nonceStr,
		// 				signature: res.data.sign.signature,
		// 				jsApiList: jsApiList
		// 			});
		// 		}
		// 	});
		// },
		ready: function() {
			// #ifdef H5
			wx.ready(fn);
			// #endif
		}
	}
}

export default tools;