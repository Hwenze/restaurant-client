<template>
	<!-- #ifdef H5 -->
	<view class="activity-box">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="activity-box pt84">
		<fixed-header>
			<template slot="header">
				<view class="header">
					<view class="left-btn" @click="back()"><i class="iconfont icon-houtui gray6 f36 "></i></view>
					<view class="header-txt">活动资讯</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->
		
		<view class="activity-lists-box">
			<view class="text-card-box">
				<view class="card-item" v-for="(item, index) in lists" :key="index" @click="toUrl('/pages/activity_consultation', {id: item.id})">
					<image class="item-cover" :src="item.picture" mode="scaleToFill"></image>
					<view class="item-main">
						<view class="item-content">{{item.title}}</view>
						<view class="item-bottom">
							<view class="item-bottom-readnum">{{item.star_time}}-{{item.end_time}}</view>
							<view class="item-bottom-time">详情</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="noData" v-if="lists.length === 0">
			<view class="no-box">
				<image class="icon" src="@/static/image/no_bg.png" mode="scaleToFill"></image>
				<p>暂无数据</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				through: true,
				lists: [],
			};
		},
		onLoad: function(options) {
			this.getRealTimeInfo();
		},
		onPullDownRefresh() {
			const that = this;
			
			setTimeout(function() {
				uni.stopPullDownRefresh();
				that.page = 1;
				that.lists = [];
				that.getRealTimeInfo();
			}, 1000);
		},
		onReachBottom() {
			if(this.through){
				this.getRealTimeInfo();
			}
		},
		methods:{
			// 获取列表数据
			getRealTimeInfo: function(){
				const that = this;
				
				that.tools.alert.loading();
				
				that.tools.ajax({
					url: '/activity/getRealTimeInfo',
					type: 'GET',
					ajaxData: {
						current: that.page,
						pageSize: 10,
					},
					successFun: function(res, errMsg) {
						that.tools.alert.closeLoading();
						if (res.data.list.length === 0) {
							that.through = false;
						} else {
							that.lists = that.lists.concat(res.data.list);
							that.page += 1;
							that.through = true;
						}
						that.lists.forEach((item)=>{
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
		components:{
		
		},
	}
</script>

<style lang="scss">
@import '@/common/scss/activity_list.scss';
</style>
