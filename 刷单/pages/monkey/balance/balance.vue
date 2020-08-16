<template>
	<view class="bigbg">
		<view class="mon">
			充值金额
		</view>
		<view class="block">
			<view class="input1">
				<input type="text" value="" placeholder-class="place naocan" placeholder="请输入充值金额" />
			</view>
			<view class="float"  >
				<view v-for="(item,index) in num" :class="index==up?'blue':''" class="numm" @click="blue(index)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="mon">
			充值方式
		</view>
		<view class="input">
			<view class="padding">
				<view class="flex">
					<view class="icon"></view>
					<view class="">
						微信支付
					</view>
				</view>
				<view @click="yes1(1)" :class="yes==1?'yes':''" class="bg"></view>
			</view>
		</view>
		<view class="input">
			<view class="padding1">
				<view class="flex">
					<view class="icon1"></view>
					<view class="">
						微信支付
					</view>
				</view>
				<view @click="yes1(2)" :class="yes==2?'yes':''" class="bg"></view>
			</view>
		</view>
		<view class="btn">
			提现
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				yes:1,
				up:0,
				num:""
			}
		},
		methods: {
			yes1(e){
				this.yes=e
			},
			blue(e){
				this.up=e
			},
		one(){
			let that = this
				uni.getStorage({
					key: "token",
					success(res) {
						that.token = res.data
					}
				})
				uni.request({
					url:getApp().globalData.http+ '/api/config/get_cz_list',
					header:{
						token:this.token
					},
					success(res) {
						if(res.data.code==1){
							that.num=res.data.data.list
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}
				})
			}
		},
		onLoad() {
			this.one()
		}
	}
</script>

<style>
	.btn{
		width: 700rpx;
		height:  88rpx;
		background: #118EEA;
		color: white;
		text-align: center;
		line-height: 88rpx;
		margin:200rpx auto 0px;
		border-radius: 999px;
	}
	.place{
		font-size:28rpx;line-height:100%;
	}
	.yes{
		background: url(../../../static/yes.png) no-repeat;
		background-size: cover;
		background-position: 100% 100%;
	}
	.bg{
		width: 36rpx;
		height: 36rpx;
		border: 1px solid #C6C6C6;
		margin-top: 32rpx;
		border-radius: 999px;
	}
	.icon{
		width: 44rpx;
		height: 40rpx;
		background: url(../../../static/wx.png) no-repeat;
		background-size: cover;
		background-position: center;
		margin: 32rpx 20rpx 0px 0px;
	}
	.icon1{
		width: 44rpx;
		height: 40rpx;
		background: url(../../../static/zfb.png) no-repeat;
		background-size: cover;
		background-position: center;
		margin: 32rpx 20rpx 0px 0px;
	}
	.flex{
		display: flex;
	}
	.padding1{
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	.padding{
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #DEDEDE;
		box-sizing: border-box;
	}
	.input{
		box-sizing: border-box;
		background: white;
		height: 100rpx;
		width: 100%;
		padding: 0rpx 28rpx;
		font-size: 14px;
	}
	.blue{
		background: #1E88DA;
		color: #FFFFFF !important;
	}
	.numm{
		font-size: 28rpx;
		float: left;
		width: auto !important;
		margin-right: 36rpx;
		border: 1px solid #1E88DA;
		padding: 12rpx 20rpx;
		margin-top: 40rpx;
		color: #1E88DA;
		border-radius: 12rpx;
	}
	.float::after{
		color: #AEAEAE;
		font-size:28rpx;
		clear:both;
		   content:"";
		   display:block;
		   height:0;
		   visibility:hidden;
	}
	.input1{
		font-size: 28rpx;
		padding: 24rpx 28rpx;
		width: 100%;
		height: 94rpx;
		border: 1px solid #DEDEDE;
		box-sizing: border-box;
		border-radius: 12rpx;
	}
	.block{
		box-sizing: border-box;
		background: white;
		width: 100%;
		padding:48rpx 24rpx ;
	}
.mon{
	box-sizing: border-box;
	font-size: 14px;
	width: 100%;
	height: 100rpx;
	padding: 30rpx;
}
	.bigbg {
		overflow: hidden;
		width: 100%;
		min-height:100%;background: #F5F5F5;
	}
</style>
