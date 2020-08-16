<template>
	<view>
		<view class="yes">
			
		</view>
		<view class="flex">
			<view class="mon" @click="mon">
				返回首页
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onBackPress() {
			uni.switchTab({
				url:"../../index/index"
			})
			return true
		},
		methods: {
			mon(){
				uni.switchTab({
					url:"../../index/index"
				})
			}
		}
	}
</script>

<style>
	.flex{
		display: flex;
		justify-content: center;
		padding: 0px 96rpx;
	}
	.index{
		width: 220rpx;
		height: 76rpx;
		border: 1px solid #999999;
		border-radius: 999px;
		font-size: 16px;
		text-align: center;
		line-height: 76rpx;
	}
	.mon{
		color: #BF0D21;
		width: 220rpx;
		height: 76rpx;
		border: 1px solid #BF0D21;
		border-radius: 999px;
		font-size: 16px;
		text-align: center;
		line-height: 76rpx;
	}
.yes{
	margin-top: 180rpx;
	margin-bottom: 80rpx;
	width: 100%;
	height: 360rpx;
	background: url(../../../static/no.png) no-repeat;
	background-size: cover;
	background-position: center;
}
</style>
