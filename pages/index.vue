<template>
	<view class="index-box">
		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" :indicator-active-color="'#FFFFFF'">
						<swiper-item v-for="(item, index) in shuffList" :key="index">
							<view class="shuffling" :style="'background-image: url(' + item.cover + ');'"></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<!-- 菜单 -->
		<view class="nav-box">
			<ul class="clearfix">
				<li v-for="(item, index) in navList" :key="index"  @click="jump(item.path, item.options ? item.options : {})">
					<image class="icon" :src="'../static/image/index_icon' + index + '.png'"></image>
					<p>{{ item.name }}</p>
				</li>
			</ul>
		</view>

		<!-- 热门商品 -->
		<view class="hot-goods">
			<view class="title" @click="jump(false)">
				<text>热门商品</text>
				<image class="right-icon" src="@/static/image/right_icon.png"></image>
			</view>
			<view class="goods" @click="toUrl('/pages/mall/goods_details', { goods_id: mianList[0].id })">
				<image class="goods-pic" :src="mianList[0].cover" mode="scaleToFill"></image>
				<view class="goods-info">
					<text class="goods-name">{{ mianList[0].name }}</text>
					<text class="goods-price">{{ mianList[0].sale_price | toFixedPrice }}元</text>
				</view>
			</view>
		</view>

		<!-- 最新资讯 -->
		<view class="information">
			<view class="title" @click="toUrl('/pages/article/lists')">
				<text>最新资讯</text>
				<image class="right-icon" src="@/static/image/right_icon.png"></image>
			</view>
			<view class="card-list" v-for="(item, index) in listsNew" :key="index" @click="toUrl('/pages/article/detail', {id: item.id})">
				<image class="pic" :src="item.cover" mode="scaleToFill"></image>
				<p class="title">{{item.title}}</p>
				<view class="content">
					<text>{{item.click_num}}人阅读</text>
					<text>{{item.created_at | timeTran}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			shuffList: [], //轮播图
			navList: [
				{ name: '订货下单', path: '/pages/replenish/list' },
				{ name: '邀请伙伴', path: '/pages/distribution/invitation' },
				{ name: '朋友圈素材', path: '/pages/friend/circle' },
				{ name: '消息中心', path: '/pages/message/list' }
			],
			newList: [], // 消息列表
			mianList: [{}],
			listsNew: [],
		};
	},
	mounted() {
		this.figure();
	},
	methods: {
		// 获取轮播图
		figure() {
			let that = this;
			that.tools.ajax({
				url: '/api/banners',
				type: 'GET',
				ajaxData: {
					device_platform: 2,
					position: 1
				},
				successFun: function(res, errMsg) {
					that.shuffList = res.list;
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
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
