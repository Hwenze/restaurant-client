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
					<view class="name">{{detailsData.shop_name}}</view>
				</view>
				<image class="shopimg" :src="detailsData.shop_avatar" mode="scaleToFill"></image>
			</view>

			<!-- 商品列表 -->
			<view class="list-box">
				<view class="list pb0 mb30">
					<view class="flex mb30" v-for="(item, index) in detailsData.snapshotInfo" :key="index">
						<image class="good-pic" :src="item.banner" mode="scaleToFill"></image>
						<view class="flex-column">
							<view class="flex-1 ellipsis2 mb15">{{item.title}}</view>
							<view class="flex">
								<view class="flex-1 money">¥{{item.price}}</view>
								<view class="count">x {{item.count}}件</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 订单金额 -->
				<view class="list mb30">
					<view class="flex">
						<view class="flex-1 count">商品金额</view>
						<view class="">¥{{detailsData.total_price}}</view>
					</view>
					<view class="flex mt15">
						<view class="flex-1 count">实付款</view>
						<view class="">¥{{detailsData.real_price}}</view>
					</view>
					<view class="flex mt15">
						<view class="flex-1 count">创建订单时间</view>
						<view class="">{{detailsData.create_time}}</view>
					</view>
				</view>

				<!-- 订单信息 -->
				<view class="list">
					<view class="flex">
						<view class="flex-1 count">订单编号</view>
						<view class="">{{detailsData.order_id}}</view>
					</view>
					<view class="flex mt15">
						<view class="flex-1 count">订单备注</view>
						<view class="">{{detailsData.remark}}</view>
					</view>
					<view class="flex mt15" v-if="detailsData.pay_time">
						<view class="flex-1 count">付款时间</view>
						<view class="">{{detailsData.create_time}}</view>
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
				detailsData: {
					snapshotInfo: []
				},
			}
		},
		onLoad(params) {
			this.params = params;
			this.getDetails();
		},
		methods: {
			getDetails: function() {
				const that = this;

				that.tools.alert.loading();

				that.tools.ajax({
					url: `/order/getOrderInfo/${that.params.id}`,
					type: 'GET',
					ajaxData: {},
					successFun: function(res, errMsg) {
						that.tools.alert.closeLoading();
						if (res.code === 200) {
							that.detailsData = res.data;
							that.detailsData.create_time = that.tools.formateDate(that.detailsData.create_time, 'YYYY-MM-DD HH:mm:ss');
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
		components: {

		},
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import '@/common/scss/order_details.scss';
</style>
