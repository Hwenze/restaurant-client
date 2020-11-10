import Tools from './tools.js';

var wechatpay = false;
var alipay = false;
var device = "wap";

// #ifdef APP-PLUS
device = "app";
plus.payment.getChannels(function(channels){
	wechatpay = channels.find(el => el.id == 'wxpay');
	alipay = channels.find(el => el.id == 'alipay');
},function(e){  
	Tools.alert.toast("获取支付通道失败："+e.message);  
}); 
// #endif

// #ifdef H5
device = "wap";
// #endif

// app 微信支付
function appwxpay(obj){
	return new Promise((resover, errover)=>{
		plus.payment.request(wechatpay, obj, function(){
			resover();
		}, function(error){
			console.log(error);
			errover(error)
		})
	})
}

// app 支付宝支付
function appalipay(obj){
	return new Promise((resover, errover)=>{
		plus.payment.request(alipay, obj, function(){
			resover();
		}, function(error){
			console.log(error);
			errover(error)
		})
	})
}

//h5 微信支付
function h5wxpay(obj){
	debugger;
	if(WeixinJSBridge && WeixinJSBridge.invoke){
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest',
			{
				"appId":obj.appId,           //公众号名称，由商户传入
				"timeStamp":obj.timestamp,   //时间戳，自1970年以来的秒数
				"nonceStr":obj.noncestr,     //随机串
				"package":obj.package,
				"signType":obj.signType,     //微信签名方式：
				"paySign":obj.paySign        //微信签名
			},function(e){
				console.log(e)
			},function(e){
				console.log(e)
			});
	}
	/*
	Tools.wx.ready(()=>{
		// chooseWXPay
		wx.invoke({
			timestamp: obj.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			nonceStr: obj.noncestr, // 支付签名随机串，不长于 32 位
			package: obj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
			signType: obj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			paySign: obj.paySign, // 支付签名
			success: function (res) {
				console.log(res);
			}
		});
	})*/
}

export default {
	// 获取支付信息
	getpaydata: function(order_id, paytype,url){
		return new Promise(resover => {
			Tools.ajax({
				url: url || '/api/order/pays',
				type: 'POST',
				ajaxData: {
					type: paytype,
					device: device,
					order_id: order_id
				},
				successFun: function(res){
					if(res.data){
						var obj = {
							...res.data,
							"appid": res.data.appId,
							"noncestr": res.data.nonceStr,
							"package": res.data.package,
							"partnerid": res.data.partnerid,
							"prepayid": res.data.prepayid,
							"timestamp": res.data.timeStamp,
							"sign": res.data.paySign,
							"paySign": res.data.paySign
						}
						resover(obj);
					}else{
						Tools.alert.toast('支付失败，网络错误！')
					}
				}
			})
		})
	},
	wechatpay: function(order_id, url){
		this.getpaydata(order_id, 'wechatpay', url,)
			.then((obj)=>{
				if(device == "app"){
					appwxpay(obj);
				}else{
					h5wxpay(obj);
				}
			});
	},
	alipay: function(order_id, url){
		this.getpaydata(order_id, 'alipay', url,)
			.then((obj)=>{
				if(device == 'app'){
					appalipay(obj);
				}else{
					Tools.alert.toast('H5暂无支付宝支付');
				}
				
			})
	},
	share: function(obj){
		
	}
}