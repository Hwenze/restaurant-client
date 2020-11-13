<template>
	<view class="index-box">
		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :indicator-active-color="'#FFFFFF'">
						<swiper-item v-for="(item, index) in 3" :key="index">
							<image class="shuffling" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 热门菜品 -->
		<view class="hot-goods">
			<view class="title" @click="toUrl('/pages/menu')">
				<text>热门菜品</text>
				<image class="right-icon" src="@/static/image/right_icon.png"></image>
			</view>
			<view class="goods" v-for="(item, index) in 3" :key="index">
				<image class="goods-pic" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
				<view class="goods-info">
					<text class="goods-name">娃哈哈娃哈哈</text>
					<text class="goods-price">33.33元</text>
				</view>
			</view>
		</view>

		<!-- 最新资讯 -->
		<view class="information">
			<view class="title">
				<text>最新资讯</text>
				<!-- <image class="right-icon" src="@/static/image/right_icon.png"></image> -->
			</view>
			<view class="card-list" v-for="(item, index) in 5" :key="index" @click="toUrl('/pages/user_agreement')">
				<image class="pic" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
				<p class="title">最新资讯最新资讯</p>
				<view class="content">
					<text>412412人阅读</text>
					<text>2020-11-13</text>
				</view>
			</view>
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
@import '@/common/scss/index.scss';
</style>
