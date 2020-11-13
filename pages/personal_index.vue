<template>
	<view class="personal-box">
	
		<!-- 具体信息 -->
		<view class="distribution-info">
			<view class="user-box">
				<image class="user-pic" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
				<view class="user-info">
					<p class="name">{{ details.user.username }}</p>
					<p class="user-id">ID {{ details.user.id }}</p>
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
			infoList:[
				{name: '我的订单', icon: '../static/image/my_order.png', path: '/pages/order_list'},
				{name: '用户协议', icon: '../static/image/agreement.png', path: '/pages/user_agreement'},
			],
			details: {
				user: {
					headimg: '../static/image/headimg.png',
					username: '游客',
					id: '666',
				}
			},
		};
	},
	mounted() {
		
	},
	methods: {
		
	},
	components: {
		
	},
	filters: {
		
	}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/common/scss/personal_index.scss';
</style>
