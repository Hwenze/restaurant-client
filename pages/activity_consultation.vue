<template>
	<!-- #ifdef H5 -->
	<view class="user_agreement">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="user_agreement pt84">
		<fixed-header>
			<template slot="header">
				<view class="header">
					<view class="left-btn" @click="back()"><i class="iconfont icon-houtui gray6 f36 "></i></view>
					<view class="header-txt">{{datas.title}}</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->
	
		<view class="agreement" v-html="datas.content"></view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			datas: {
				title: '',
				content: '',
			},
		};
	},
	onLoad: function(options) {
		this.id = options.id;
		this.getRealTimeDateils();
	},
	methods: {
		getRealTimeDateils: function(){
			const that = this;
		
			that.tools.ajax({
				url: '/activity/getRealTimeDateils',
				type: 'GET',
				ajaxData: {
					id: that.id
				},
				successFun: function(res, errMsg) {
					console.log(res)
					that.datas = res.data;
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
@import '@/common/scss/user_agreement.scss';
</style>