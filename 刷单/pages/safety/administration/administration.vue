<template>
	<view class="bigbg">
		<view class="fgx"></view>
		<navigator url="../sunter/sunter">
			<view class="input">
				<view class="flex">
					<view class="">
						修改支付密码
					</view>
					<view class="icon"></view>
				</view>
			</view>
		</navigator>
		<!-- <navigator url="../yunredn/yunredn">
			<view class="input">
				<view class="flex">
					<view class="">
						找回支付密码
					</view>
					<view class="icon"></view>
				</view>
			</view>
		</navigator> -->
		
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
	.flex{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		box-sizing: border-box;
	}
	.icon{
		width: 12rpx;
		height: 22rpx;
		background: url(../../../static/my_right_arrow.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin-top: 44rpx;
	}
	.input{
		width: 100%;
		height: 108rpx;
		background: white;
		line-height: 108rpx;
		box-sizing: border-box;
		padding: 0px 30rpx;
	}
.bigbg{
	height: 100%;
	width: 100%;
	background: #F5F5F5;
	font-size: 16px;
}
</style>
