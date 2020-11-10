<template>
	<view class="input-num">
		<view class="btn btn_minus" :disabled="cannotClick" @click="minus(value)">-</view>
		<input class="input" ref="input" type="number" :min="min" :value="value" @input="updateValue($event.target.value)" readonly="readonly" />
		<view class="btn btn_plus" :disabled="cannotClick" @click="plus(value)">+</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tmpValue: 0
		};
	},
	mounted() {
		this.tmpValue = this.value;
	},
	props: {
		min: {
			default: 0
		},
		max: {},
		remaining: {},
		value: {
			require: true
		},
		disabled: {
			default: false
		},
		disabledClick: {
			default: false
		},
		cannotClick: {
			default: false
		},
		dataKey: {
			default: null
		}
	},
	methods: {
		updateValue: function(val) {
			this.tmpValue = Math.ceil(val);
		},
		minus: function(val) {
			if (val > this.min) {
				if (this.dataKey != null) {
					this.$emit('input', { val, key: String(this.dataKey), type: 'minus' });
				} else {
					val--;
					this.$emit('input', val);
				}
			}
		},
		plus: function(val) {
			if (this.disabledClick) {
				this.tools.alert.toast('亲，不能再加了');
				return;
			}
			if (this.max && val >= this.max) {
				this.tools.alert.toast('亲，不能再加了');
				return;
			}
			if (this.remaining < 1) {
				this.tools.alert.toast('亲，不能再加了');
				return;
			}

			if (this.dataKey != null) {
				this.$emit('input', { val, key: String(this.dataKey), type: 'plus' });
			} else {
				val++;
				this.$emit('input', val);
			}
		}
	},
	watch: {
		tmpValue(val) {
			//debugger
			if (val < this.min) {
				val = this.min;
			}
			if (val > this.max) {
				val = this.max;
			}

			this.tmpValue = val;

			if (this.dataKey != null) {
				this.$emit('input', { val, key: String(this.dataKey) });
			} else {
				this.$emit('input', val);
			}
		}
	},
	components: {},
	filters: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.input-num {
	width: 140rpx;
	height: 48rpx;
	position: relative;
	border: 1rpx solid $uni-text-color-disable;
	z-index: 0;
	@include vertical-sides();

	.input {
		width: 80rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		font-size: $uni-font-size-f5;
		color: $uni-text-color;
	}

	.btn {
		width: 40rpx;
		height: 48rpx;
		line-height: 48rpx;
		text-align: center;
		border: none;
	}
	
	.btn_minus{
		color: $uni-text-color-disable;
		border-right: 1rpx solid $uni-text-color-disable;
	}
	
	.btn_plus{
		line-height: 44rpx;
		color: $uni-text-color-inverse;
		border-left: 1rpx solid $uni-text-color-disable;
	}
}
</style>
