<template>
	<view>
		<view class="pagetags-scroll">
			<view class="pagetag-item" :class="{ active: index == i.id }" v-for="i in tags" :key="i.id" @click="setindex(i)">
				<view class="pagetag-item-text">{{ i.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			index: 0
		};
	},
	props: {
		tags: {
			type: Array,
			required: false,
			default: function() {
				return [];
			}
		},
	},
	methods: {
		setindex(item) {
			this.$emit('end', item);
			this.index = item.id;
		}
	}
};
</script>

<style lang="scss"></style>
