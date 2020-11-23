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
					<view class="header-txt">用户协议</view>
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
			details: '',
		};
	},
	mounted() {
		this.getAgreement();
	},
	methods: {
		getAgreement: function(){
			const that = this;
		
			that.tools.ajax({
				url: '/api/getAgreement',
				type: 'GET',
				ajaxData: {},
				successFun: function(res, errMsg) {
					that.details = res.data.agreement;
				},
				errorFun: function(errorData, status, headers, errorObj) {
					that.tools.alert.toast(errorData.error_msg);
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
@import '@/common/scss/user_agreement.scss';
</style>