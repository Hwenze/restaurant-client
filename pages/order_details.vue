<template>
	<!-- #ifdef H5 -->
	<view class="order_details">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="order_details pt84">
		<fixed-header>
			<template slot="header">
				<view class="header">
					<view class="left-btn" @click="back()"><i class="iconfont icon-houtui gray6 f36 "></i></view>
					<view class="header-txt">订单详情</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->
	
		<!-- 店铺信息 -->
		<view class="shop-box flex">
			<view class="flex-column flex-1">
				<view class="name">hahahahah</view>
			</view>
			<image class="shopimg" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
		</view>
		
		<!-- 商品列表 -->
		<view class="list-box">
			<view class="list pb0 mb30">
				<view class="flex mb30" v-for="(item, index) in 5" :key="index">
					<image class="good-pic" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
					<view class="flex-column">
						<view class="flex-1 ellipsis2 mb15">gsagsagsagsa</view>
						<view class="flex">
							<view class="flex-1 money">¥33.33</view>
							<view class="count">x 3件</view>
						</view>
					</view>
				</view>
			</view>
		
		<!-- 订单金额 -->
		<view class="list mb30">
			<view class="flex">
				<view class="flex-1 count">商品金额</view>
				<view class="">¥55.66</view>
			</view>
			<view class="flex mt15">
				<view class="flex-1 count">实付款</view>
				<view class="">¥66.77</view>
			</view>
		</view>
		
		<!-- 订单信息 -->
		<view class="list">
			<view class="flex">
				<view class="flex-1 count">订单编号</view>
				<view class="">sfsafsaf</view>
			</view>
			<view class="flex mt15">
				<view class="flex-1 count">订单备注</view>
				<view class="">hfjkahfjkasfha健康好费劲啊</view>
			</view>
			<view class="flex mt15">
				<view class="flex-1 count">付款时间</view>
				<view class="">2020-20-20</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {},
			}
		},
		onLoad(params) {
			this.params = params;
		},
		methods: {
			
		},
		components:{
			
		},
	}
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/common/scss/order_details.scss';
</style>