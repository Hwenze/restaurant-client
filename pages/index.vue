<template>
	<view class="index-box">
		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :indicator-active-color="'#FFFFFF'">
						<swiper-item v-for="(item, index) in rotaList" :key="index">
							<image class="shuffling" :src="item.picture" mode="scaleToFill"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 热门店铺 -->
		<view class="hot-goods">
			<view class="title" @click="toUrl('/pages/menu')">
				<text>热门店铺</text>
				<image class="right-icon" src="@/static/image/right_icon.png"></image>
			</view>
			<view class="goods" v-for="(item, index) in 1" :key="index">
				<image class="goods-pic" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
				<view class="goods-info">
					<text class="goods-name">娃哈哈娃哈哈</text>
					<text class="goods-price">33.33元</text>
				</view>
			</view>
		</view>

		<!-- 活动资讯 -->
		<view class="information">
			<view class="title" @click="toUrl('/pages/activity_list')">
				<text>活动资讯</text>
				<image class="right-icon" src="@/static/image/right_icon.png"></image>
			</view>
			<view class="card-list" v-for="(item, index) in realtimeList" :key="index" @click="toUrl('/pages/activity_consultation', {id: item.id})">
				<image class="pic" :src="item.picture" mode="scaleToFill"></image>
				<p class="title">{{item.title}}</p>
				<view class="content">
					<text>{{item.star_time}} ~ {{item.end_time}}</text>
					<text class="more">详情</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			rotaList: [], 		// 轮播图
			realtimeList: [], 	// 活动资讯
		};
	},
	mounted() {
		this.rotationFn();
		this.getRealTimeInfo();
	},
	methods: {
		// 获取轮播图数据
		rotationFn: function(){
			const that = this;

			that.tools.ajax({
				url: '/api/getHomeRotation',
				type: 'GET',
				ajaxData: {},
				successFun: function(res, errMsg) {
					that.rotaList = res.data;
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.msg);
				}
			});
		},
		
		// 获取活动资讯数据
		getRealTimeInfo: function(){
			const that = this;

			that.tools.ajax({
				url: '/activity/getRealTimeInfo',
				type: 'GET',
				ajaxData: {
					current: 1,
					pageSize: 6,
				},
				successFun: function(res, errMsg) {
					that.realtimeList = res.data.list;
					that.realtimeList.forEach((item)=>{
						item.star_time = that.tools.formateDate(item.star_time, 'YYYY-MM-DD');
						item.end_time = that.tools.formateDate(item.end_time, 'YYYY-MM-DD');
					})
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.msg);
				}
			});
		},
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
