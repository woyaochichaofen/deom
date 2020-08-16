<template>
	<view class='bigbg'>
		<view class="bg">
			<view class="sm">
				可用余额（{{zmb}}）
			</view>
			<view class="">
				{{mon}}
			</view>
		</view>
		<view class="fgx"></view>
		<navigator url="top-up/top-up">
		<view class="input1">
			<view class="block1"></view>
				<view class="flex2">
				<view class="">
					{{pkc}}充值
				</view>
				<view class="right"></view>
			</view>
		</view>
		</navigator>
		<navigator url="withdraw/withdraw" v-if="tx==1">
		<view class="input1">
			<view class="block4"></view>
			<view class="flex2">
				<view class="">
					{{pkc}}提现
				</view>
				<view class="right"></view>
			</view>
		</view>
		</navigator>
		<navigator url="min/min" v-if="mx==1">
		<view class="input1">
			<view class="block5"></view>
			<view class="flex2">
				<view class="">
					{{pkc}}明细
				</view>
				<view class="right"></view>
			</view>
		</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mon:"",
				cz:"",
				zmb:"",
				pkc:"",
				mx:0,
				tx:0,
			}
		},
		methods: {
			
		},
		onShow() {
			let token=""
			uni.getStorage({
				key : "token",
				success(res) {
					token=res.data
				}
			})
			const that=this
			uni.request({
				url:getApp().globalData.http+"/api/config/tab_status",
				method:"POST",
				success: (res) => {
					console.log(res)
					this.mx=res.data.data.mx_entrance
					this.tx=res.data.data.tx_entrance
				}
			})
			uni.request({
				url:getApp().globalData.http+"/api/amount/balance",
				method:"POST",
				header:{
					token:token
				},
				success:(res)=> {
					console.log(res)
					if(res.data.code!=1){
							uni.redirectTo({
								url:"../resgin/resgin"
							})
					}
					if(res.data.data.recharge_type==1){
						this.cz="recharge/recharge"
					}
					that.mon=res.data.data.balance
				}
			})
		},
		onLoad() {
			let token=""
			uni.getStorage({
				key : "token",
				success(res) {
					token=res.data
				}
			})
			uni.getStorage({
				key : 'zmb',
				success: (res) => {
					this.zmb=res.data
				}
			})
			uni.getStorage({
				key : 'pkc',
				success: (res) => {
					this.pkc=res.data
				}
			})
			const that=this
			uni.request({
				url:getApp().globalData.http+"/api/config/tab_status",
				method:"POST",
				success: (res) => {
					console.log(res)
					this.mx=res.data.data.mx_entrance
					this.tx=res.data.data.tx_entrance
				}
			})
			uni.request({
				url:getApp().globalData.http+"/api/amount/balance",
				method:"POST",
				header:{
					token:token
				},
				success:(res)=> {
					console.log(res)
					if(res.data.code!=1){
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
					}
					if(res.data.data.recharge_type==1){
						this.cz="recharge/recharge"
					}
					that.mon=res.data.data.balance
				}
			})
		}
	}
</script>

<style>
	.flex2 {
		height: 100%;
		width: calc(100% - 62rpx);
		display: flex;
		border-bottom: 1px solid #EDEDED;
		display: flex;
		justify-content: space-between;
	}
	.right {
		width: 14rpx;
		height: 28rpx;
		background: url(../../static/my_right_arrow.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.block4 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/tubiao5.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.block5 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/qwe.png) no-repeat;
		background-size: cover;
		background-position: center;
	}
	.block1 {
		margin-right: 32rpx;
		width: 30rpx;
		height: 32rpx;
		background: url(../../static/cash_withdrawal_z.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.input1 {
		line-height: 32rpx;
		font-size: 14px;
		padding: 28rpx 32rpx 0px 32rpx;
		display: flex;
		width: 100%;
		height: 90rpx;
		box-sizing: border-box;
		background: white;
	}
	.sm{
		margin-top: 108rpx;
		margin-bottom: 12rpx;
		font-size: 14px;
	}
.bg{
	overflow: hidden;
	width: 100%;
	height: 400rpx;
	background: #0087EB;
	color: white;
	text-align: center;
	font-size: 40px;
}
.bigbg {
		overflow: hidden;
		width: 100%;
		min-height:calc(100vh - 88rpx) ;
		/* min-height:100%;background: #F5F5F5; */
	}
</style>
