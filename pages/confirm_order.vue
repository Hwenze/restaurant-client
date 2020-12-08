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
					<text class="title">{{orderData.shop.shop_name}}</text>
					<view class="list" v-for="(item, index) in orderData.list" :key="index">
						<view class="list-left">
							<image :src="item.banner" mode="scaleToFill"></image>
							<text class="name">{{item.title}}</text>
							<text class="num">x {{item.count}}</text>
						</view>
						<text class="price">￥{{item.price}}</text>
					</view>
					<text class="subtotal">小计 ￥<text class="total-price">{{orderData.totalPrice}}</text></text>
				</view>
			</view>

			<view class="other-box">
				<view class="other-list">
					<text class="title">就餐人数</text>
					<input type="number" v-model="people_num" placeholder="请输入就餐人数" />
				</view>
			</view>

			<view class="other-box mt0">
				<view class="other-list">
					<text class="title">订单备注</text>
					<input type="text" v-model="remark" placeholder="请输入订单备注" />
				</view>
			</view>

			<view class="settlement">
				<text class="price">￥{{orderData.totalPrice}}</text>
				<view class="operation active" @click="submitOrder()">确认订单</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {},
				orderData: {
					shop: {},
					list: [],
					totalPrice: 0
				},
				people_num: '',
				remark: ''
			};
		},
		onLoad(params) {
			console.log(params);
			this.params = params;
			this.getConfirmOrder();
		},
		methods: {
			getConfirmOrder: function() {
				let that = this,
					goods = [];

				that.tools.alert.loading();

				that.tools.cache.get('selectedList').forEach((item, index) => {
					goods.push({
						id: item.id,
						count: item.num
					})
				})

				that.tools.ajax({
					url: '/order/confirmOrder',
					type: 'POST',
					ajaxData: {
						shop_id: this.params.shop_id,
						table_num: 1,
						goods
					},
					successFun: function(res, errMsg) {
						that.tools.alert.closeLoading();
						if (res.code === 200) {
							that.orderData = res.data;
						} else {
							that.tools.alert.toast(res.msg);
						}
					},
					errorFun: function(errorData, status, headers, errorObj) {
						that.tools.alert.toast(errorData.msg);
					}
				});
			},

			// 确认订单
			submitOrder: function() {
				let that = this,
					goods = [];

				that.tools.alert.loading();

				that.orderData.list.forEach((item, index) => {
					goods.push({
						id: item.id,
						count: item.count
					})
				})

				that.tools.ajax({
					url: '/order/createOrder',
					type: 'POST',
					ajaxData: {
						shop_id: 1,
						table_num: 1,
						people_num: that.people_num,
						goods,
						remark: that.remark,
					},
					successFun: function(res, errMsg) {
						that.tools.alert.closeLoading();
						if (res.code === 200) {
							that.tools.alert.toast('下单成功!');
							setTimeout(() => {
								that.tools.cache.set('selectedList', [])
								that.closeCurrentTo('/pages/order_list');
							}, 1500)
						} else {
							that.tools.alert.toast(res.msg);
						}
					},
					errorFun: function(errorData, status, headers, errorObj) {
						that.tools.alert.toast(errorData.msg);
					}
				});
			}
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
