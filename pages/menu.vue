<template>
	<!-- #ifdef H5 -->
	<view class="menu">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="menu pt84">
		<fixed-header>
			<template slot="header">
				<view class="header">
					<view class="left-btn" @click="back()"><i class="iconfont icon-houtui gray6 f36 "></i></view>
					<view class="header-txt">菜单列表</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->
	
		<!-- 头部 -->
		<view class="header-box">
			<view class="header-bg" :style="'background-image: url(' + 'http://iph.href.lu/168x168' + ');'"></view>
			<view class="header-icon" :style="'background-image: url(' + 'http://iph.href.lu/168x168' + ');'"></view>
			<view class="header-title">餐厅餐厅</view>
		</view>

		<!-- 菜单列表 -->
		<view class="menu-list">
			<easy-scroll @openDetails="openDetails" :isShowdetails='isShowdetails'></easy-scroll>
		</view>
		
		<!-- 购物车 -->
		<view class="shopping-cart">
			<view class="cart-box">
				<view class="icon-box" @click="isShowdishes = true">
					<view class="icon active"></view>
					<view class="num">1</view>
				</view>
				<text class="price">￥21.9</text>
			</view>
			<view class="operation active" @click="toUrl('/pages/confirm_order')">去结算</view>
		</view>
		
		<!-- 菜品详情弹窗 -->
		<view class="dishes-details" v-show="isShowdetails" @click="isShowdishes = false">
			<view class="details-box">
				<view class="dishes-bg">
					<image class="pic" src="http://iph.href.lu/420x414"></image>
					<image class="icon" src="../static/image/close.png" @click="isShowdetails = false;"></image>
				</view>
				<view class="details">
					<text class="title">可口可乐可口可乐可口可乐可口可乐可口可乐</text>
					<view class="operation-box">
						<view class="price-box">
							<text class="price">￥72.88</text>
							<text class="original-price">￥33.98</text>
						</view>
						<view class="icon-box">
							<image class="icon" src="../static/image/reduce.png"></image>
							<text class="num">99</text>
							<image class="icon" src="../static/image/add.png"></image>
						</view>
					</view>
					<text class="science">主要原料：牛肉、青菜</text>
				</view>
			</view>
		</view>
		
		<!-- 已选菜品弹窗 -->
		<view class="selected-dishes" v-show="isShowdishes">
			<view class="list-box">
				<view class="choose-empty">
					<text class="title">已选菜品</text>
					<view class="empty-right">
						<image src="../static/image/empty.png"></image>
						<text>清空</text>
					</view>
				</view>
				
				<view class="item-box">
					<view class="list">
						<text class="variety-dishes">娃哈哈娃哈哈</text>
						<view class="price-box">
							<text class="original-price">￥33.98</text>
							<text class="price">￥72.88</text>
						</view>
						<view class="icon-box">
							<image class="icon" src="../static/image/reduce.png"></image>
							<text class="num">99</text>
							<image class="icon" src="../static/image/add.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import easyScroll from '@/components/easy-scroll.vue';
	
export default {
	data() {
		return {
			isShowdetails: false,	//是否显示菜品详情
			isShowdishes: false,	//是否显示购物车列表
		};
	},
	mounted() {
		
	},
	methods: {
		// 打开菜品详情
		openDetails: function(val){
			this.isShowdetails = val;
		}
	},
	filters: {
		
	},
	components: {
		easyScroll
	}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/common/scss/menu.scss';
</style>