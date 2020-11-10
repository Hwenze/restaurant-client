<template>
	<view class="personal-box">
	
		<!-- 具体信息 -->
		<view class="distribution-info">
			<view class="user-box" @click="toUrl('/pages/personal_center')">
				<image class="user-pic" :src="details.user.headimg" mode="scaleToFill"></image>
				<view class="user-info">
					<p class="name">{{ details.user.username }}</p>
					<p class="user-id" v-if="details.user.id">ID {{ details.user.id }}</p>
				</view>
				<view class="level" v-if="details.user.level_id">{{ details.user.level_id | levelName}}</view>
			</view>
			<view class="order-box">
				<view class="order-list" v-for="(item, index) in orderList" :key="index" @click="toUrl('/pages/order/list', item.options)">
					<image class="icon" :src="item.icon"></image>
					<p class="name">{{item.name}}</p>
				</view>
			</view>
		</view>
		
		<view class="list" v-for="(item, index) in infoList" :key="index" @click="toUrl(item.path)">
			<view class="list-info">
				<image class="icon" :src="item.icon"></image>
				<text>{{item.name}}</text>
			</view>
			<image class="right-icon" src="@/static/image/right_icon.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderList:[
				{name: '全部订单', icon: '../static/image/all_order_icon.png', options: {status: -1}},
				{name: '待付款', icon: '../static/image/for_pay_icon.png', options: {status: 0}},
				{name: '待发货', icon: '../static/image/send_goods_icon.png', options: {status: 1}},
				{name: '待收货', icon: '../static/image/for_goods_icon.png', options: {status: 2}},
				// {name: '已完成', icon: '../static/image/completed_icon.png', options: {status: 3}},
			],
			infoList:[
				{name: '个人资料', icon: '../static/image/personal_data.png', path: '/pages/personal_center'},
				{name: '更换手机', icon: '../static/image/personal_phone.png', path: '/pages/change/phone'},
				// {name: '更换邮箱', icon: '../static/image/personal_email.png', path: '/pages/change/email'},
				{name: '地址管理', icon: '../static/image/address_manage.png', path: '/pages/change/address'},
			],
			details: {
				user: {
					headimg: '../static/image/headimg.png',
					username: '游客',
					id: '',
					level_id: '',
				}
			},
		};
	},
	mounted() {
		let that = this;
		
		if(this.tools.cache.get('userInfo').is_user == 1){
			this.getData();
		}
		
		uni.$on('update', function(data){
			that.getData();
		})
	},
	methods: {
		// 获取个人数据
		getData: function() {
			let that = this;

			that.tools.alert.loading();
			that.tools.ajax({
				url: '/api/agency/user/summaries',
				type: 'GET',
				ajaxData: {
					order: 1
				},
				successFun: function(res, errMsg) {
					that.tools.alert.closeLoading();
					that.details = res.data;
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
				}
			});
		},
	},
	components: {},
	filters: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/common/scss/personal_index.scss';
</style>
