<template>
	<view class="bigbg">
		<view class="fgx"></view>
		<view class="input">
			<view class="flex">
				<view class="right">
					开户行
				</view>
				<view class="hui">
					请选择开户行
				</view>
			</view>
			<view class="icon"></view>
		</view>
		<view class="fgx"></view>
		<view class="input1">
			<view class="right">
				持卡人
			</view>
			<view class="hui">
				<input type="text" value="" placeholder-class="naocan" placeholder="请输入持卡人姓名" />
			</view>
		</view>
		<view class="input1">
			<view class="right">
				卡号
			</view>
			<view class="hui">
				<input type="text" value="" placeholder-class="naocan" placeholder="请输入银行卡卡号" />
			</view>
		</view>
		<view class="input">
			<view class="flex">
				<view class="right">
					开户地区
				</view>
				<view class="hui">
					请选择开户地区
				</view>
			</view>
			<view class="icon"></view>
		</view>
		<view class="input1">
			<view class="right">
				支行名称
			</view>
			<view class="hui">
				<input type="text" value="" placeholder-class="naocan" placeholder="请输入支行名称" />
			</view>
		</view>
		<view class="btn">
			确定
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
	.btn{
		width: 100%;
		height: 88rpx;
		text-align: center;
		color: white;
		line-height: 88rpx;
		font-size: 16px;
		position: fixed;bottom: 0px;
		background: #BF0D21;
	}
	.input1{
		background: white;
		display: flex;
		padding: 36rpx 20rpx;
		font-size: 14px;
		border-bottom: 1px solid #F5F5F5;
	}
	.hui{
		color: #999999;
	}
	.right{
		margin-right: 50rpx;
	}
	.flex{
		display: flex;
	}
	.icon{
		margin-top: 4rpx;
		width: 14rpx;
		height: 28rpx;
		background: url(../../static/my_right_arrow.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.input{
		font-size: 14px;
		padding: 36rpx 20rpx;
		display: flex;
		justify-content: space-between;
		background: white;
	}
	.fgx{
		height: 20rpx;
	}
.bigbg{
	background: #F5F5F5;
	min-height:100%;
}
</style>
