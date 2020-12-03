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
				<view class="container">
					<view class="nav-list">
						<view class="nav-item" v-for="(item, index) of categoryList" :class="{active:index == viewNavIndex}" @click="handleClickNav(index)"
						 :key="index">{{item.name}}</view>
					</view>

					<view class="list-wrapper">
						<scroll-view class="list-container" id="list-container" @scroll="handleListScroll" @touchstart="handleTouchScrollView"
						 :scroll-y="true" :scroll-into-view="'scroll-item-'+clickedNavIndex" :show-scrollbar="false"
						 :scroll-with-animation="true">
							<view class="list" v-for="(item, listIndex) of categoryList" :key="'a'+ listIndex" :id="'scroll-item-'+listIndex">
								<view class="list-title">
									<text class="name">{{item.name}}</text>
									<text class="introduce">{{item.desc}}</text>
								</view>
								<view class="item-container">
									<view class="item" v-for="(it, index) of item.productList" :key="'b'+ index">
										<image class="food-pic" :src="it.banner" mode="scaleToFill" @click="openDetails()"></image>
										<view class="content">
											<text class="title">{{it.title}}</text>
											<text class="introduce">{{it.sub_title}}</text>
											<view class="other">
												<view class="price-box">
													<text class="price">￥{{it.price}}</text>
													<!-- <text class="original-price">￥33.98</text> -->
												</view>
												<operation-num ref="nums" :listIndex="listIndex" :value="it.num" :index="index" @operaNums="operaNums"></operation-num>
											</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>

			<!-- 购物车 -->
			<view class="shopping-cart">
				<view class="cart-box">
					<view class="icon-box" @click="isShowdishes = true">
						<view class="icon active"></view>
						<view class="num" v-if="selectedList.length > 0">{{selectedList.length}}</view>
					</view>
					<text class="price">￥{{totalPrice}}</text>
				</view>
				<view class="operation active" @click="settlement()">去结算</view>
			</view>

			<!-- 菜品详情弹窗 -->
			<view class="dishes-details" v-show="isShowdetails">
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
			<view class="selected-dishes" v-show="isShowdishes" @click="isShowdishes = false">
				<view class="list-box">
					<view class="choose-empty">
						<text class="title">已选菜品</text>
						<view class="empty-right">
							<image src="../static/image/empty.png"></image>
							<text @click.stop="emptyFunc()">清空</text>
						</view>
					</view>

					<view class="item-box">
						<view class="list" v-for="(item, index) in selectedList" :key="index">
							<text class="variety-dishes">{{item.title}}</text>
							<view class="price-box">
								<!-- <text class="original-price">￥33.98</text> -->
								<text class="price">￥{{item.price}}</text>
							</view>
							<view class="icon-box">
								<image class="icon" @click.stop="seloper(index, 'reduce')" src="../static/image/reduce.png"></image>
								<text class="num">{{item.num}}</text>
								<image class="icon" @click.stop="seloper(index, 'add')" src="../static/image/add.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	import Vue from 'vue';
	import operationNum from "@/components/operation-num";

	export default {
		data() {
			return {
				topDistance: 0,
				list: Array(10).fill(1), //列表数据
				isTouchScrollView: false,
				clickedNavIndex: 0,
				viewNavIndex: 0,
				nodeInfoList: [],

				categoryList: [], //分类列表 + 商品列表
				selectedList: [], //已选列表
				totalPrice: 0, //总价

				isShowdetails: false, //是否显示菜品详情
				isShowdishes: false, //是否显示购物车列表
			};
		},
		onLoad() {
			this.$nextTick(function() {
				this.getProductData();
				this.init();
			})
		},
		onShow() {
			this.getCache();
		},
		methods: {
			// 获取商品列表
			getProductData: function() {
				const that = this;
				
				that.tools.alert.loading();
				
				that.tools.ajax({
					url: '/product/queryCategoryByAdminId',
					type: 'GET',
					ajaxData: {},
					successFun: function(res, errMsg) {
						that.tools.alert.closeLoading();
						res.data.categoryList.forEach((item, index) => {
							item.productList.forEach((it, idx) => {
								it.num = 0;
							})
						})
						that.categoryList = res.data.categoryList;
						that.getCache();
					},
					errorFun: function(errorData, status, headers, errorObj) {
						that.tools.alert.toast(errorData.msg);
					}
				});
			},

			// 组件数量计算
			operaNums: function(val) {
				this.categoryList[val.listIndex].productList[val.index].num = val.num;
				this.productFunc();
			},
			
			// 总菜品列表改变
			productFunc: function() {
				this.selectedList = [];
				this.categoryList.forEach((item, index) => {
					item.productList.forEach((it, idx) => {
						if (it.num > 0) {
							this.selectedList.push({
								id: it.id,
								title: it.title,
								price: it.price,
								num: it.num
							});
						}
					})
				})
				this.tools.cache.set('selectedList', this.selectedList);
			},

			// 已选菜品改变数量
			seloper: function(listIndex, type) {
				this.categoryList.forEach((item, index) => {
					item.productList.forEach((it, idx) => {
						if (it.id === this.selectedList[listIndex].id) {
							if(type === 'add'){
								it.num += 1;
							}else{
								it.num -= 1;
							}
						}
					})
				})
				this.productFunc();
			},
			
			// 清空
			emptyFunc: function(){
				this.categoryList.forEach((item, index) => {
					item.productList.forEach((it, idx) => {
						it.num = 0;
					})
				})
				this.productFunc();
			},

			// 从缓存获取变量
			getCache: function(){
				let arr = this.tools.cache.get('selectedList') || [];
				this.categoryList.forEach((item, index) => {
					item.productList.forEach((it, idx) => {
						if(arr.length < 1){
							it.num = 0;
						}else{
							arr.forEach((ait, adx)=>{
								if (it.id === ait.id) {
									it.num = ait.num;
								}
							})
						}
					})
				})
				this.productFunc();
			},
			
			// 结算
			settlement: function(){
				if(this.selectedList.length < 1){
					this.tools.alert.toast('请先点菜!');
					return
				}
				this.toUrl('/pages/confirm_order', {shop_id: 1});
			},
			
			init: function() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('#list-container .list').boundingClientRect(data => {
					// console.log(data);
					this.nodeInfoList = data;
				}).exec()
			},

			handleClickNav: function(nav) {
				if (!this.isTouchScrollView && this.clickedNavIndex == nav) return;
				// 锁定联动
				this.isTouchScrollView = false;
				// 解决clickedNavIndex相同触发更新失败
				if (this.clickedNavIndex == nav) {
					this.clickedNavIndex = -1;
				}
				this.$nextTick(function() {
					this.clickedNavIndex = nav;
					this.viewNavIndex = nav;
				})
			},

			handleListScroll: function(e) {
				if (!this.isTouchScrollView) return;
				let scrollTop = this.scrollTop = e.detail.scrollTop;
				// console.log("scrollTop: " + scrollTop);
				let currentNavIndex = this.nodeInfoList.map((item, index) => ({
						index,
						...item
					}))
					.filter(item => item.top <= scrollTop + this.topDistance)
					.sort((a, b) => b.top - a.top)[0].index; // 数组为空的时候战术性报错
				// console.log(currentNavIndex);
				this.viewNavIndex = currentNavIndex;
			},

			handleTouchScrollView: function() {
				this.isTouchScrollView = true;
			},

			// 打开菜品详情
			openDetails: function(val) {
				this.isShowdetails = true;
			}
		},
		watch: {
			selectedList: function(val) {
				let total_price = 0;
				val.forEach((item, index) => {
					total_price += item.num * item.price;
				})
				this.totalPrice = total_price;
				if(this.totalPrice === 0){
					this.isShowdishes = false;
				}
			}
		},
		filters: {

		},
		components: {
			operationNum
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss">
	@import '@/common/scss/menu.scss';
</style>
