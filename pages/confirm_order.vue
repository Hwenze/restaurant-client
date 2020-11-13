<template>
	<!-- #ifdef H5 -->
	<view class="confirm_order">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="confirm_order pt84">
		<fixed-header>
			<template slot="header">
				<view class="header">
					<view class="left-btn" @click="back()"><i class="iconfont icon-houtui gray6 f36 "></i></view>
					<view class="header-txt">确认订单</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->
	
		<!-- 背景 -->
		<view class="bg"></view>
		
		<view class="order-box">
			<view class="order-list">
				<text class="title">7分甜（湛江徐闻徐城镇店）</text>
				<view class="list" v-for="i in 10" :key="i">
					<view class="list-left">
						<image src="../static/image/index_icon_act.png" mode="scaleToFill"></image>
						<text class="name">可口可乐可口可乐可口可乐可口可乐</text>
						<text class="num">x 99</text>
					</view>
					<text class="price">￥22.22</text>
				</view>
				<text class="subtotal">小计 ￥<text class="total-price">22.22</text></text>
			</view>
		</view>
		
		<view class="other-box">
			<view class="other-list">
				<text class="title">订单备注</text>
				<input type="text" placeholder="请输入订单备注"/>
			</view>
		</view>
		
		<view class="settlement">
			<text class="price">￥21.9</text>
			<view class="operation active">确认订单</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	mounted() {
		
	},
	methods: {
		
	},
	filters: {
		
	},
	components: {

	}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/common/scss/confirm_order.scss';
</style>