<template>
	<view class="hidden">
		<view class="bg">

		</view>
		<navigator url="../bal_card/bal_card">
			<view class="btn" >
				添加银行卡
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {}
	}
</script>

<style>
	.btn {
		font-size: 16px;
		width: 450rpx;
		height: 80rpx;
		color: white;
		background: #0087EB;
		text-align: center;
		line-height: 80rpx;
		border-radius: 12rpx;
		margin: auto;
	}

	.bg {
		width: 500rpx;
		height: 368rpx;
		background: url(../../../static/z_bank_card_empty.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin: 232rpx auto 66rpx;
	}
</style>
