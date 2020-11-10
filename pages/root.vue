<template>
	<!-- #ifdef H5 -->
	<view class="root">
	<!-- #endif -->
	
	<!-- #ifndef H5 -->
	<view class="root pt84">
		<fixed-header>
			<template slot="header">
				<view class="header">
					<view class="header-txt">{{typeName}}</view>
					<view class="right-btn"></view>
				</view>
			</template>
		</fixed-header>
	<!-- #endif -->
	
		<!-- 主页滑动块 -->
		<swiper class="index_swiper" :duration="100" :current="type" :indicator-dots="false" :disable-touch="true">
			<swiper-item>
				<in-dex></in-dex>
			</swiper-item>
			<swiper-item>
				<personal-index></personal-index>
			</swiper-item>
		</swiper>

		<view class="foot-fixed" id="footer">
			<view class="item-foot" @click="tabChange(0)">
				<view class="icon index" :class="[type === 0 ? 'index_act' : '']"></view>
				<p :class="[type === 0 ? 'active' : '']">首页</p>
			</view>
			<view class="item-foot" @click="tabChange(1)">
				<view class="icon personal" :class="[type === 1 ? 'personal_act' : '']"></view>
				<p :class="[type === 1 ? 'active' : '']">个人中心</p>
			</view>
		</view>
	</view>
</template>

<script>
import InDex from '@/pages/index';
import PersonalIndex from '@/pages/personal_index';

export default {
	data() {
		return {
			type: 0,
			typeName: '商城首页',
		};
	},
	onLoad(params) {
		console.log(111);
		let that = this;
		
		uni.$on('updateType', function(data){
			that.type = data.type;
		})
	},
	onShow() {
		// console.log(222)
	},
	mounted() {

	},
	methods: {
		tabChange(index){
			this.type = index;
		}
	},
	watch:{
		type(val){
			switch(val){
				case 0:
					this.typeName = '首页';
					break;
				case 1:
					this.typeName = '个人中心';
					break;
			}
		},
	},
	components: {
		InDex,
		PersonalIndex
	}
};
</script>

<style lang="scss">
@import '@/common/scss/root.scss';
</style>