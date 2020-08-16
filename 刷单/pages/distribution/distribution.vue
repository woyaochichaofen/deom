<template>
	<view class="bigbg">
		<view class="top">
			<view class="ton">
				账户余额（{{mzb}}）
			</view>
			<view class="flex">
				<view class="">
					{{key}}
				</view>
				<navigator  hover-class="none" url="deposit/deposit">
					<view class="tx">
						提现
					</view>
				</navigator>
				
			</view>
			<navigator hover-class="none"  url="detail/detail">
				<view class="bot-btn">
					订单详情
				</view>
			</navigator>
			
		</view>
		<view class="padding">
			<view class="fgx">我的工具</view>
			<view class="foot">
					<view class="bgnan" @click="tz('tema/tema')">
						<view class="icon3"></view>
						<view class="">
							我的团队
						</view>
					</view>
					<view class="bgnan border"  @click="tz('god/god')">
						<view class="icon4"></view>
						<view class="">
							我要推广 	
						</view>
					</view>
				
				<view class="bgnan" @click="sales">
					<view class="icon5"></view>
					<view class="">
						分销订单
					</view>
				</view>
			</view>
			<view class="foot">
				<view class="bgnan" @click="detail">
					<view class="icon6"></view>
					<view class="">
						佣金明细
					</view>
				</view>
				<view class="bgnan border" @click="mon">
					<view class="icon7"></view>
					<view class="">
						我要提现 	
					</view>
				</view>
				<view class="">
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mzb:"",
				key:"0.00"
			}
		},
		methods: {
			tz(e){
				uni.navigateTo({
					url:e
				})
			},
			detail(){
				uni.navigateTo({
					url:"detail/detail"
				})
			},
			sales(){
			uni.navigateTo({
				url:"sales/sales"
			})	
			},
			mon(){
				uni.navigateTo({
					url:"deposit/deposit"
				})
			}
		},
		onLoad() {
			uni.getStorage({
				key : "zmb",
				success: (res) => {
					this.mzb=res.data
				}
			})
			let token=""
			uni.getStorage({
				key:"token",
				success:(res)=>{
					token=res.data
				}
			})
			uni.request({
				url:getApp().globalData.http+"/api/agency/index",
				method:"POST",
				header:{
					token:token
				},
				success: (res) => {
					if(res.data.code!=1){
						uni.showToast({
							title:res.data.msg,
							icon:"none",
							success: () => {
								uni.switchTab({
									url:"../me/me"
								})
							}
						})
					}
					this.key=res.data.data.commission
					console.log(res)
				}
			})
		}
	}
</script>

<style>
	.padding{
		padding: 0px 32rpx;
	}
	.bot-btn{
		color: white;
		width: 150rpx;
		height: 48rpx;
		border:1px solid white;
		border-radius: 999px;
		font-size: 14px;
		text-align: center;
		line-height: 48rpx;
	}
	.tx{
		font-size: 14px;
		width: 170rpx;
		height: 56rpx;
		background: rgb(255,255,255);
		color: #0087EB;
		text-align: center;
		line-height: 56rpx;
		border-radius: 999px;
		margin-top: 14rpx;
	}
	.flex{
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 30px;
	}
	.ton{
		font-size: 14px;
		margin-bottom: 20rpx;
	}
	.bigbg{
		background: #F5F5F5;
		min-height:100%;
	}
	.border{
		border-right: 1px solid #F5F5F5;
		border-left: 1px solid #F5F5F5;
	}
	.icon6{
		width: 60rpx;
		height: 48rpx;
		background: url(../../static/statistics_z.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin:64rpx auto 22rpx;
	}
	.icon7{
		width: 60rpx;
		height: 48rpx;
		background: url(../../static/cash_withdrawal_z.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin:64rpx auto 22rpx;
	}
	.icon3{
		width: 60rpx;
		height: 48rpx;
		background: url(../../static/team_z.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin:64rpx auto 22rpx;
	}
	.icon4{
		width: 60rpx;
		height: 48rpx;
		background: url(../../static/share_z.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin:64rpx auto 22rpx;
	}
	.icon5{
		width: 60rpx;
		height: 48rpx;
		background: url(../../static/order_z.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin:64rpx auto 22rpx;
	}
	.bgnan{
		width: 228rpx;
		border-bottom: 1px solid #F5F5F5;
		box-sizing: border-box;
		height: 100%;
		font-size: 12px;
		text-align: center;
	}
	.foot view{
		width: 228rpx;
	}
	.foot{
		justify-content: space-between;
		display: flex;
		background: white;
		width: auto;
		height: 220rpx;
	}
	.fgx{
		font-size: 14px;
		line-height: 86rpx;
		height: 86rpx;
		background: #F5F5F5;
	}
	.btn{
		width: 150rpx;
		height: 46rpx;
		box-sizing: border-box;
		border: 1px solid white;
		border-radius: 999px;
		text-align: center;
		font-size: 12px;
		line-height: 46rpx;
		margin: auto;
	}
	.title1{
		font-size: 24px;
		margin-bottom: 24rpx;
	}
	.icon1{
		width: 28rpx;
		height: 22rpx;
		background: url(../../static/crown_z.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin-right:16rpx ;
		margin-top: 4rpx;
	}
	.icon2{
		margin-top: 4rpx;
		width: 28rpx;
		height: 22rpx;
		background: url(../../static/customer_z.png) no-repeat;
		background-size: contain;
		background-position: center;
		margin-right:16rpx ;
	}
	.p{
		font-size: 12px;
	}
	.title{
		font-size: 20px;
		margin-bottom: 20rpx;
	}
	.icon{
		margin-right: 20rpx;
		width: 130rpx;
		height: 130rpx;
		background: url(../../static/a_bag.png) no-repeat;
		background-size: contain;
		background-position: center;
	}
	.top{
		color: white;
		background: url(../../static/x.png) no-repeat;
		background-size: contain;
		background-position: center;
		width: 100%;
		box-sizing: border-box;
		height: 348rpx;
		padding: 68rpx 64rpx;
	}
.flex{
	display: flex;
}
</style>
