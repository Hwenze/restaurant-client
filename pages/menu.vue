<template>
	<view class="menu">
		<!-- 头部 -->
		<view class="header-box">
			<view class="header-bg" :style="'background-image: url(' + 'http://iph.href.lu/168x168' + ');'"></view>
			<view class="header-icon" :style="'background-image: url(' + 'http://iph.href.lu/168x168' + ');'"></view>
			<view class="header-title">餐厅餐厅</view>
		</view>

		<!-- 菜单列表 -->
		<view class="menu-list">
			<easy-scroll></easy-scroll>
		</view>
		
		<!-- 购物车 -->
		<view class="shopping-cart">
			<view class="cart-box">
				<view class="icon-box">
					<view class="icon active"></view>
					<view class="num">1</view>
				</view>
				<text class="price">￥21.9</text>
			</view>
			<view class="operation active">去结算</view>
		</view>
	</view>
</template>

<script>
import easyScroll from '@/components/easy-scroll.vue';
	
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
		easyScroll
	}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import '@/common/scss/menu.scss';
</style>