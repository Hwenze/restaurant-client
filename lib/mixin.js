import Vue from 'vue';
import tools from './tools.js'
Vue.mixin({
	data() {
		return {
			// #ifdef APP-PLUS
			device: "app",
			// #endif
			// #ifdef H5
			device: "wap",
			// #endif
		}
	},
	/* 全局方法 */
	methods: {
		// 默认图片过滤
		thumbnail: function(val, size) {
			return !val ? logoImg : val + (!size ? '' : size);
		},
		
		// 关闭当前页
		back() {
			uni.navigateBack({
				delta: 1
			});
		},
		
		// 关闭当前页到某个页面
		closeCurrentTo(url, val) {
			let that = this,
				loc;
			loc = val ? url + '?' + that.convertObj(val) : url;
			uni.redirectTo({
				url: loc
			});
		},
		
		// 跳转
		toUrl: function(url, val) {
			let that = this,
				loc;
			console.log(url)
			loc = val ? url + '?' + that.convertObj(val) : url;
			uni.navigateTo({
				url: loc
			});
		},

		// 关闭所有页面，打开到应用内的某个页面
		toReplace(url, val) {
			let that = this,
				loc;
			console.log(url)
			loc = val ? url + '?' + that.convertObj(val) : url;
			uni.reLaunch({
				url: loc
			});
		},
		
		// 数组去重
		objectUnique(arr, name) {
			let hash = {}; 
			arr = arr.reduce(function (item, next) { 
				hash[next[name]] ? '' : hash[next[name]] = true && item.push(next); 
				return item 
			},  [])

			return arr;
		},

		convertObj(data) {
			var _result = [];
			for (var key in data) {
				var value = data[key];
				if (value.constructor == Array) {
					value.forEach(function(_value) {
						_result.push(key + "=" + _value);
					});
				} else {
					_result.push(key + '=' + value);
				}
			}
			return _result.join('&');
		},

		getStatus() {
			let that = this;
			
			that.tools.ajax({
				url: '/api/status',
				type: 'GET',
				successFun: function(res, errMsg) {
					if (res.data.is_user == 1) {
						that.closeCurrentTo('/pages/new_index');
					}
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
				}
			});
		},

		// 分享
		uniShare(obj) {
			let that = this,
				o = obj || {};
			let provider = o.provider || 'weixin',
				scene = o.scene || 'WXSceneSession',
				type = o.type || 0,
				title = o.title || '五禾',
				imageUrl = o.imageUrl || '/static/images/wechat.png',
				summary = o.summary || '五禾',
				href = o.href;
			// #ifdef APP-PLUS
			uni.share({
				provider: provider,
				scene: scene,
				title: title,
				type: type,
				imageUrl: imageUrl,
				summary: summary,
				href: href,
				success: function(res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function(err) {
					console.log("fail:" + JSON.stringify(err));
				}
			});
			// #endif
		},

		//h5分享
		webshare(obj) {
			let that = this,
				o = obj || {};
			let provider = o.provider || 'weixin',
				scene = o.scene || 'WXSceneSession',
				type = o.type || 0,
				title = o.title || '五禾',
				imageUrl = o.imageUrl || '/static/images/wechat.png',
				summary = o.summary || '五禾',
				href = o.href;
			// #ifdef H5
			wx.ready(function() { //需在用户可能点击分享按钮前就先调用
				wx.onMenuShareTimeline({
					title: title, // 分享标题
					desc: summary, // 分享描述
					link: href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: imageUrl, // 分享图标
					success: function() {
						// 设置成功
					}
				})
			});
			// 分享给朋友
			wx.onMenuShareAppMessage({
				desc: summary || '五禾商城', // 分享描述
				title: title || '五禾商城', // 分享标题
				link: href, // 分享链接
				imgUrl: imageUrl, // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			// #endif
		},

		// 分享
		uniShowShare(obj) {
			let that = this,
				o = obj || {};
			let provider = o.provider || 'weixin',
				scene = o.scene || 'WXSceneSession',
				type = o.type || 0,
				title = o.title || '五禾',
				path = o.path || 'pages/index/index',
				imageUrl = o.imageUrl || '/static/images/logo.png',
				summary = o.summary || '五禾';

			uni.showShareMenu({
				path: path,
				imageUrl: imageUrl,
				title: title,
				content: summary,
				success: function(res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function(err) {
					console.log("success:" + JSON.stringify(err));
				}
			});
		}
	},
	/* 全局过滤 */
	filters: {
		/* 默认图片过滤 */
		thumbnail: function(val, size) {
			return !val ? logoImg : val + (!size ? '' : size);
		},

		/* 时间转换 */
		timeTran: function(value) {
			return !value ? '-' : tools.date('Y-m-d H:i:s', value);
		},

		/* 自定时间格式转换 */
		setTimeTran: function(value, type) {
			return parseInt(value) === 0 ? '-' : tools.date(type, value);
		},

		// 当前年份 m.d H:i, 其他H.m.d H:i
		setTimeToTran: function(value, type) {
			var y = new Date().getFullYear(),
				Y = new Date(value).getFullYear();
			if (Y == y) {
				return parseInt(value) === 0 ? '-' : tools.date('m.d H:i', Number(value));
			} else {
				return parseInt(value) === 0 ? '-' : tools.date('Y.m.d H:i', Number(value));
			}
		},

		/* 价格转换--保留两位小数 */
		toFixedPrice: function(value) {
			return value ? (parseInt(value) / 100).toFixed(2) : '0';
		},

		/* 价格转换 */
		toPrice: function(value) {
			return value ? (parseInt(value) / 100) : '0';
		},

		//价格转换(保留两位小数,不足补零,大数字3位数加一个逗号)
		priceFormat: function(val) {
			//val是以分为单位
			if (typeof val === "undefined") {
				return;
			}
			var val_str = "",
				val_arr = [];
			val_str = val.toString();
			val_arr = val_str.split("");
			//判断价格位数
			if (val_arr.length <= 5) {
				return (val / 100).toFixed(2);
			} else {
				val_arr.splice(val_arr.length - 2, 0, "."); //添加小数点
				for (
					var i = val_arr.length - 4, num = 1; i > 0; i--, num++
				) {
					if (num == 3) {
						val_arr.splice(i, 0, ","); //添加逗号
						num = 1;
						i--;
					}
				}
				return val_arr.join("");
			}
		},

		// 等级转换
		levelName: function(val) {
			let txt = '';
			switch (val) {
				case 0:
					txt = '普通用户';
					break;
				case 1:
					txt = '会员';
					break;
				case 2:
					txt = 'VIP会员';
					break;
				case 3:
					txt = '区域经销商';
					break;
				case 4:
					txt = '总经销商';
					break;
				case 5:
					txt = '特约经销商';
					break;
				case 6:
					txt = '合伙人';
					break;
				case 7:
					txt = '高级合伙人';
					break;
				case 8:
					txt = '董事';
					break;
				case 9:
					txt = '高级董事';
					break;
				case 10:
					txt = '战略董事';
					break;
				case 11:
					txt = '联合创始人';
					break;
				default:
					txt = '';
			}
			return txt;
		},

		// 订单状态
		f_status: function(status) {
			let txt = "";
			switch (Number(status)) {
				case -1:
					txt = "全部状态";
					break;
				case 0:
					txt = "待付款";
					break;
				case 1:
					txt = "待发货";
					break;
				case 2:
					txt = "待收货";
					break;
				case 3:
					txt = "已完成";
					break;
				case 4:
					txt = "售后中";
					break;
				case 5:
					txt = "已关闭";
					break;
				case 6:
					txt = "售后完成";
					break;
				case 7:
					txt = "已取消";
					break;
				case 8:
					txt = "待审核";
					break;
				case 9:
					txt = "审核失败";
					break;
				case 10:
					txt = "待填运费";
					break;
			}
			return txt;
		},
	}
});
