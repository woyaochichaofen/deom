<template>
	<view>
		<view class="top">
			<input class="input" type="text" placeholder-class="naocan" placeholder="请输入名称" />
		</view>
		<view class="button">
			保存
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
			
		}
	}
</script>

<style>
	.button{
		width: 690rpx;
		height: 88rpx;
		margin: auto;
		background: #118EEA;
		text-align: center;
		line-height: 88rpx;
		font-size: 18px;
		color: white;
		border-radius: 12rpx;
	}
.top{
	padding: 30rpx;
	box-sizing: border-box;
	margin-top: 28rpx;
	margin-bottom: 100rpx;
}
.input{
	width: 100%;
	height: 100rpx;
	box-sizing: border-box;
	border-bottom:1px solid #EEEEEE ;
}
</style>
