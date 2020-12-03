<template>
	<view class="icon-box">
		<image class="icon" :style="'opacity:' + value + ';'" src="../static/image/reduce.png" @click="minus(value)"></image>
		<text class="num" :style="'opacity:' + value + ';'">{{value}}</text>
		<image class="icon" src="../static/image/add.png" @click="plus(value)"></image>
	</view>
</template>

<script>
	export default {
		name: 'operation-num',
		props: {
			listIndex: {
				type: Number,
				default: 0
			},
			index: {
				type: Number,
				default: 0
			},
			value: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {

			};
		},
		mounted() {
			
		},
		methods: {
			// 减
			minus: function(num) {
				if (num !== 0) {
					num--;
					let data = {
						listIndex: this.listIndex,
						index: this.index,
						num: num,
					};
					this.$emit('operaNums', data);
				}
			},
			
			// 加
			plus: function(num) {
				num++;
				let data = {
					listIndex: this.listIndex,
					index: this.index,
					num: num,
				};
				this.$emit('operaNums', data);
			}
		},
		watch: {
			
		},
		components: {},
		filters: {}
	};
</script>

<style rel="stylesheet/scss" lang="scss">
	.icon-box {
		width: 150rpx;
		@include vertical-sides();

		.icon {
			width: 48rpx;
			height: 48rpx;
		}

		.num {
			color: $uni-text-color;
			font-size: $uni-font-size-f4;
		}
	}
</style>
