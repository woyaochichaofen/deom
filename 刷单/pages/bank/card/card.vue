<template>
	<view class="bigbg">
		<view class="fgx"></view>
		<view class="input">
			<view class="">
				<view class="">
					中国建设银行
				</view>
				<view class="top">
					6545 4124 1245 1452 546
				</view>
			</view>
			<view class="right" @click="alert">解绑</view>
		</view>
		<view class="fgx"></view>
		<view class="input">
			<view class="">
				<view class="">
					中国建设银行
				</view>
				<view class="top">
					6545 4124 1245 1452 546
				</view>
			</view>
			<view class="right" @click="alert">解绑</view>
		</view>
		<view class="btn">
			添加银行卡
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
alert(){
	uni.showModal({
		title:"你确定解除绑定吗？",
		confirmColor:"#D71831"
	})
}
		}
	}
</script>

<style>
	.right{
		width: 90rpx;
		height: 48rpx;
		background: #F3F3F3;
		border-radius: 12rpx;
		text-align: center;
		line-height: 48rpx;
		font-size: 12px;
		margin-top: 20rpx;
	}
	.top{
		margin-top: 20rpx;
	}
	.fgx{
		height: 20rpx;
	}
	.bigbg{
		background: #F5F5F5;
		min-height:100%;
	}
	.input{
		padding: 40rpx 24rpx;
		background: white;
		display: flex;
		justify-content: space-between;
		font-size: 16px;
	}
	.btn {
		width: 100%;
		height: 88rpx;
		text-align: center;
		color: white;
		line-height: 88rpx;
		font-size: 16px;
		position: fixed;
		bottom: 0px;
		background: #D9122B;
	}
</style>
