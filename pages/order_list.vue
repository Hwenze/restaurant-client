<template>
	<!-- #ifdef H5 -->
	<view class="order_list">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="order_list pt84">
		<fixed-header>
			<template slot="header">
				<view class="header">
					<view class="left-btn" @click="back()"><i class="iconfont icon-houtui gray6 f36 "></i></view>
					<view class="header-txt">订单列表</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->
	
		<scroll-view scroll-y style="width: 100%;height: 100%;" @scrolltolower="reachBottom(type)">
			<view class="list-box" v-if="lists.length > 0">
				<view class="list" v-for="(item, index) in 5" :key="index" @click="toUrl('/pages/order_details')">
					<view class="flex mb30 f5">
						<view class="flex-1">7812568721658127</view>
					</view>
					<view class="flex mb15">
						<image class="good-pic" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
						<view class="good-right flex-column">
							<view class="flex-1 ellipsis2">可口可乐</view>
							<view class="flex">
								<view class="flex-1 time">下单时间：2020-11-12 17:46</view>
							</view>
						</view>
					</view>
					<view class="text-right f6 mb15">
						<view class="span mr15">共3件,</view>
						<view class="span"> ¥66.66元</view>
					</view>
				</view>
			</view>
			
			<view class="noData" v-if="lists.length === 0">
				<view class="no-box">
					<image class="icon" src="@/static/image/no_bg.png" mode="scaleToFill"></image>
					<text>暂无订单</text>
				</view>
			</view>
			
		</scroll-view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			lists: [{}],
		};
	},
	onLoad: function(options) {
		
	},
	onPullDownRefresh() {
		
	},
	mounted() {
		
	},
	onReachBottom() {
		
	},
	methods: {
		// 滑动到底部触发
		reachBottom(val) {
			console.log(val)
		},
	},
	watch:{
		
	},
	components: {

	}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/common/scss/order_list.scss';
</style>