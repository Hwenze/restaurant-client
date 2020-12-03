<template>
	<!-- #ifdef H5 -->
	<view class="order_list pt84">
		<fixed-header>
			<template slot="header">
				<scroll-tags ref="tags" @end="tagsclick" :tags="catList"></scroll-tags>
			</template>
		</fixed-header>
		<!-- #endif -->

		<!-- #ifndef H5 -->
		<view class="order_list pt184">
			<fixed-header>
				<template slot="header">
					<view class="header">
						<view class="left-btn" @click="back()"><i class="iconfont icon-houtui gray6 f36 "></i></view>
						<view class="header-txt">订单列表</view>
						<view class="right-btn"></view>
					</view>
					<scroll-tags ref="tags" @end="tagsclick" :tags="catList"></scroll-tags>
				</template>
			</fixed-header>
			<!-- #endif -->

			<swiper class="list_swiper" :duration="100" @change="changeSwitch" :current="type" :indicator-dots="false"
			 :disable-touch="false">
				<swiper-item v-for="(i, n) in swiperList" :key="n">
					<scroll-view scroll-y style="width: 100%;height: 100%;" @scrolltolower="reachBottom(type)">
						<view class="list-box" v-if="lists[n].arrList.length > 0">
							<view class="list" v-for="(item, index) in lists[n].arrList" :key="index" @click="toUrl('/pages/order_details', {id: item.order_id})">
								<view class="flex mb30 f5">
									<view class="flex-1">{{item.order_id}}</view>
								</view>
								<view class="flex mb15">
									<image class="good-pic" src="http://iph.href.lu/168x168" mode="scaleToFill"></image>
									<view class="good-right flex-column">
										<view class="flex-1 ellipsis2">{{item.nickname}}</view>
										<view class="flex">
											<view class="flex-1 time">下单时间：{{item.create_time}}</view>
										</view>
									</view>
								</view>
								<view class="text-right f6 mb15">
									<view class="span mr15">用餐人数：{{item.people_num}},</view>
									<view class="span"> 总消费：¥{{item.total_price}}元</view>
								</view>
							</view>
						</view>

						<view class="noData" v-if="lists[n].arrList.length === 0">
							<view class="no-box">
								<image class="icon" src="@/static/image/no_bg.png" mode="scaleToFill"></image>
								<text>暂无订单</text>
							</view>
						</view>

					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
</template>

<script>
	import scrollTags from "@/components/scroll-tags";

	export default {
		data() {
			return {
				swiperList: [{
						name: 'lists0'
					},
					{
						name: 'lists1'
					},
					{
						name: 'lists2'
					},
					{
						name: 'lists3'
					},
				],
				status: -1,
				type: 0,
				catList: [{
					id: -1,
					name: '全部'
				}, {
					id: 0,
					name: '待付款'
				}, {
					id: 2,
					name: '已完成'
				}, {
					id: 1,
					name: '已取消'
				}],
				lists: [{
						arrList: [],
						current: 1,
						through: true
					},
					{
						arrList: [],
						current: 1,
						through: true
					},
					{
						arrList: [],
						current: 1,
						through: true
					},
					{
						arrList: [],
						current: 1,
						through: true
					},
				],
			}
		},
		onLoad: function(options) {
			this.catList.forEach((item, index) => {
				this.getData(index, item.id);
			})
		},
		onPullDownRefresh() {
			let that = this;

			setTimeout(function() {
				uni.stopPullDownRefresh();
				that.lists[that.type].current = 1;
				that.catList.forEach((item, index) => {
					if (that.type == index) {
						that.getData(index, item.id);
					}
				})
			}, 1000);
		},
		mounted() {
			this.$refs.tags.index = this.status;
		},
		methods: {
			// 获取列表数据
			getData: function(idx, status) {
				let that = this,
					ajaxData = {
						current: that.lists[idx].current,
						member_id: 1
					};

				that.tools.alert.loading();
				if (that.lists[idx].current === 1) {
					that.lists[idx].arrList = [];
				}
				if (status != -1) {
					ajaxData.status = status;
				}
				that.tools.ajax({
					url: `/order/getOrderList`,
					type: 'GET',
					ajaxData: ajaxData,
					successFun: function(res, errMsg) {
						that.tools.alert.closeLoading();
						if (res.code === 200) {
							if (res.data.list.length === 0) {
								that.lists[idx].through = false;
							} else {
								that.lists[idx].arrList = that.lists[idx].arrList.concat(res.data.list);
								that.lists[idx].current += 1;
								that.lists[idx].through = true;
							}
							that.lists[idx].arrList.forEach((item) => {
								item.create_time = that.tools.formateDate(item.create_time, 'YYYY-MM-DD HH:mm:ss');
							})
						} else {
							that.tools.alert.toast(res.msg);
						}
					},
					errorFun: function(errorData, status, headers, errorObj) {
						that.tools.alert.toast(errorData.msg);
					}
				});
			},

			// 滑动到底部触发
			reachBottom(val) {
				if (this.lists[val].through) {
					this.catList.forEach((item, index) => {
						if (val == index) {
							this.getData(index, item.id);
						}
					})
				}
			},

			// 选择tap
			tagsclick(item) {
				this.status = item.id;
				this.catList.forEach((it, index) => {
					if (item.name === it.name) {
						this.type = index;
					}
				})
			},

			// 改变switch
			changeSwitch(e) {
				this.type = e.detail.current;
				this.catList.forEach((item, index) => {
					if (e.detail.current == index) {
						this.status = item.id;
					}
				})
				this.$refs.tags.index = this.status;
			},
		},
		components: {
			scrollTags
		},
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import '@/common/scss/order_list.scss';
</style>
