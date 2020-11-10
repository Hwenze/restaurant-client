<template>
    <view class="container">
        <view class="nav-list">
            <view class="nav-item"
                v-for="(item,index) of list" 
                :class="{active:index==viewNavIndex}"
                @click="handleClickNav(index)"
                :key="index">分类{{index}}</view>
        </view>
		
        <view class="list-wrapper">
            <scroll-view class="list-container" id="list-container"
                @scroll="handleListScroll"
                @touchstart="handleTouchScrollView"
                :scroll-y="true" 
                :scroll-into-view="'scroll-item-'+clickedNavIndex"
                :show-scrollbar="false"
                :scroll-with-animation="true">
                <view class="list" v-for="(item, listIndex) of list" :key="listIndex" :id="'scroll-item-'+listIndex">
                    <view class="list-title">
						<text class="name">分类{{listIndex}}</text>
						<text class="introduce">大家喜欢吃，才叫真好吃</text>
					</view>
                    <view class="item-container">
                        <view class="item" v-for="(item, index) of [1,2,3,4,5]" :key="index">
                            <image class="food-pic" src="../static/image/index_icon_act.png" mode="scaleToFill"></image>
							<view class="content">
								<text class="title">可口可乐{{listIndex}}-{{index}}</text>
								<text class="introduce">介绍介绍介绍介绍</text>
								<view class="other">
									<view class="price-box">
										<text class="price">￥2.88</text>
										<text class="original-price">￥33.98</text>
									</view>
									<image class="icon" src="../static/image/add.png"></image>
								</view>
							</view>
						</view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'easy-scroll',
    props:{
        topDistance:{
            type: Number,
            default:0
        }
    },
    data() {
        return {
            list: Array(10).fill(1),//列表数据
            isTouchScrollView: false,
            clickedNavIndex: 0,
            viewNavIndex: 0,
            nodeInfoList: [],
        }
    },
	mounted() {
	    this.$nextTick(function(){
	        this.init();
	    })
	},
    methods:{
        init(){
            const query = uni.createSelectorQuery().in(this);
            query.selectAll('#list-container .list').boundingClientRect(data => {
                // console.log(data);
                this.nodeInfoList = data;
            }).exec()
        },
        handleClickNav(nav){
            if(!this.isTouchScrollView&&this.clickedNavIndex == nav) return;
            // 锁定联动
            this.isTouchScrollView = false;
            // 解决clickedNavIndex相同触发更新失败
            if(this.clickedNavIndex == nav){
                this.clickedNavIndex = -1;
            }
            this.$nextTick(function(){
                this.clickedNavIndex = nav;
                this.viewNavIndex = nav;
            })
        },
        handleListScroll(e){
            if(!this.isTouchScrollView) return;
            let scrollTop = this.scrollTop = e.detail.scrollTop;
            // console.log("scrollTop: " + scrollTop);
            let currentNavIndex = this.nodeInfoList.map((item,index)=>({index,...item}))
            .filter(item => item.top <= scrollTop + this.topDistance)
            .sort((a,b)=>b.top-a.top)[0].index;
            // console.log(currentNavIndex);
            this.viewNavIndex = currentNavIndex;
        },
        handleTouchScrollView(){
            this.isTouchScrollView = true;
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../common/scss/tool.scss';
	
.container{
	display: flex;
	height: calc(100vh - var(--window-top));
	
	.nav-list{
		width: 160rpx;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $uni-font-size-f5;
		background-color: $uni-text-color-placeholder;
		
		&::-webkit-scrollbar{
			width: 0;
			height: 0;
			background: transparent;
		}
		
		.nav-item{
			width: 100%;
			padding: 40rpx 0;
			text-align: center;
			transition: transform .1s linear;
			
			&.active{
				color: $uni-color-primary;
				transform-origin: center center;
				transform: scale(1.2);
				background-color: $uni-bg-color;
				font-weight: bold;
			}
		}
	}
	    
	.list-wrapper{
		flex: 1;
		position: relative;
		
		.list-container{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 0 32rpx;
			box-sizing: border-box;
			
			.list-title{
				height: 88rpx;
				line-height: 88rpx;
				
				.name{
					color: $uni-text-color;
					font-size: $uni-font-size-f5;
				}
				
				.introduce{
					color: $uni-text-color-grey;
					font-size: $uni-font-size-f6;
					margin-left: 15rpx;
				}
			}
			    
			.item-container{
				
				.item{
					width: 100%;
					height: 166rpx;
					margin: 20rpx 0;
					@include vertical-sides();
					
					.food-pic{
						width: 166rpx;
						height: 166rpx;
					}
					
					.content{
						width: 363rpx;
						
						.title{
							display: block;
							color: $uni-text-color;
							font-size: $uni-font-size-f4;
							@include wordEllipsis();
						}
						
						.introduce{
							display: block;
							color: $uni-text-color-grey;
							font-size: $uni-font-size-f6;
							margin-top: 15rpx;
							@include wordEllipsis();
						}
						
						.other{
							margin-top: 7rpx;
							@include vertical-sides();
							
							.price-box{
								
								.price{
									color: $uni-color-primary;
									font-size: $uni-font-size-f4;
									font-weight: bold;
								}
								
								.original-price{
									color: $uni-text-color-grey;
									font-size: $uni-font-size-f5;
									text-decoration: line-through;
									margin-left: 20rpx;
								}
							}
								
							.icon{
								width: 68rpx;
								height: 68rpx;
							}
						}
					}
				}
			}
		}
	}
}
</style>
