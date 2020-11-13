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
					<view class="header-txt">活动资讯</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->
	
		<view class="agreement" v-html="details">
			
		</view>
	
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			details: '活动资讯活动资讯活动资讯',
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
@import '@/common/scss/user_agreement.scss';
</style>