<template>
	<!-- #ifdef H5 -->
	<view class="personal-box">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="personal-box pt84">
		<fixed-header>
			<template slot="header">
				<view class="header">
					<view class="left-btn" @click="back()"><i class="iconfont icon-houtui gray6 f36 "></i></view>
					<view class="header-txt">个人中心</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->

		<view class="content-card">
			<view class="list" @click="portrait()">
				<text class="title">头像</text>
				<view class="choose">
					<image class="pic" :src="datas.headimg" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="list">
				<text class="title">会员名</text>
				<view class="choose"><text class="detailed">{{datas.username}}</text></view>
			</view>
		</view>

		<view class="content-card">
			<view class="list">
				<text class="title">微信登录</text>
				<view class="choose">
					<text class="content active">{{datas.is_bind_wechat ? '解绑' : '未绑定'}}</text>
					<image class="right-icon" src="../static/image/right_icon.png"></image>
				</view>
			</view>
			<view class="list" @click="toUrl('/pages/change/password')">
				<text class="title">修改登录密码</text>
				<view class="choose"><image class="right-icon" src="../static/image/right_icon.png"></image></view>
			</view>
			<view class="list" @click="toUrl('/pages/change/trade_password')">
				<text class="title">交易密码管理</text>
				<view class="choose"><image class="right-icon" src="../static/image/right_icon.png"></image></view>
			</view>
		</view>

		<view class="content-card">
			<view class="list" @click="toUrl('/pages/change/phone')">
				<text class="title">更改手机</text>
				<view class="choose"><image class="right-icon" src="../static/image/right_icon.png"></image></view>
			</view>
			<!-- <view class="list">
				<text class="title">更改邮箱</text>
				<view class="choose"><image class="right-icon" src="../static/image/right_icon.png"></image></view>
			</view> -->
		</view>

		<view class="content-card">
			<view class="list">
				<text class="title">商家电话</text>
				<view class="choose"><text class="detailed">{{superiors.phone}}</text></view>
			</view>
			<!-- <view class="list">
				<text class="title">关于五禾</text>
				<view class="choose"><image class="right-icon" src="../static/image/right_icon.png"></image></view>
			</view> -->
			<view class="list" @click="toUrl('/pages/introduction')">
				<text class="title">公司简介</text>
				<view class="choose"><image class="right-icon" src="../static/image/right_icon.png"></image></view>
			</view>
		</view>

		<view class="logout" @click="logout()">退出帐号</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			datas: {},
			superiors: {},
		};
	},
	onLoad(params) {
		this.getData();
		this.getSuperiors();
	},
	mounted() {
		
	},
	onShow() {},
	methods: {
		// 获取数据
		getData: function () {
			let that = this;
			that.tools.ajax({
				url: '/api/users',
				type: 'GET',
				ajaxData: {},
				successFun: function(res, errMsg) {
					that.datas = res.data;
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
				}
			});
		},
		
		// 获取上级数据
		getSuperiors: function () {
			let that = this;
			that.tools.ajax({
				url: '/api/agency/superiors',
				type: 'GET',
				ajaxData: {},
				successFun: function(res, errMsg) {
					that.superiors = res.data;
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
				}
			});
		},
		
		// 上传头像
		portrait(){
			let that = this;
			uni.chooseImage({
			    count: 1, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    success: function (resMsg) {
					console.log(resMsg)
					that.tools.alert.loading();
					that.tools.ajax({
						url: '/api/upload',
						type: 'POST',
						ajaxData: {
							// #ifdef H5
							file_type: resMsg.tempFiles[0].type,
							filename: resMsg.tempFiles[0].name,
							// #endif
							// #ifdef APP-PLUS
							file_type: 'image/jpeg',
							filename: '1M_gaitubao_270x230.jpg',
							// #endif
							part_size: 204800,
							total_size: resMsg.tempFiles[0].size,
							upload_setting: "local",
							upload_type: "headpic"
						},
						successFun: function(res) {
							that.tools.alert.closeLoading();
							uni.uploadFile({
								url: that.tools.apiUrl + '/api/upload/files',
								filePath: resMsg.tempFilePaths[0],
								name: 'file',
								header: {
									'X-ISAPI': 1,
									'Authorization': that.tools.cache.get('Authorization')
								},
								formData: {
									'upload_id': res.data.upload_id,
									'name': resMsg.tempFiles[0].name,
									'part_now': res.data.part_num,
								},
								success: (uploadFileRes) => {
									that.uploadFile(res.data.upload_id);
								}
							});
						},
						errorFun: function(errorData, status, headers, errorObj) {
							console.log(errorData)
							that.tools.alert.toast(errorData.error_msg);
						}
					});
			    }
			});
		},
		
		// 上传文件
		uploadFile(id){
			let that = this;
			that.tools.ajax({
				url: `/api/upload/local/completes/${id}`,
				type: 'PUT',
				ajaxData: {},
				successFun: function(res, errMsg) {
					console.log(res)
					that.uploadHead(id);
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
				}
			});
		},
		
		// 更新头像
		uploadHead(id){
			let that = this;
			that.tools.alert.loading();
			that.tools.ajax({
				url: '/api/users',
				type: 'POST',
				ajaxData: {
					headimg: id,
					type:0
				},
				successFun: function(res, errMsg) {
					that.tools.alert.toast('上传完成');
					that.getData();
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
				}
			});
		},
		
		// 退出登录
		logout() {
			let that = this;
			that.tools.ajax({
				url: '/api/logouts',
				type: 'POST',
				ajaxData: {},
				successFun: function(res, errMsg) {
					that.tools.cache.del('userInfo');
					that.toReplace('/pages/login');
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
				}
			});
		}
	},
	components: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/common/scss/personal_center.scss';
</style>
